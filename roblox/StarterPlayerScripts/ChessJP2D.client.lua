-- Chess.JP 2D Roblox Starter
-- Put this LocalScript inside StarterPlayer > StarterPlayerScripts.

local Players = game:GetService("Players")
local player = Players.LocalPlayer

local BOARD_SIZE = 8
local LIGHT = Color3.fromRGB(238, 219, 186)
local DARK = Color3.fromRGB(118, 150, 97)
local SELECTED = Color3.fromRGB(245, 211, 75)
local MOVE_TARGET = Color3.fromRGB(110, 185, 115)
local CAPTURE_TARGET = Color3.fromRGB(224, 92, 76)

local board = {}
local squareButtons = {}
local selectedSquare = nil
local legalTargets = {}
local turn = "w"
local moveNumber = 1
local capturedWhite = {}
local capturedBlack = {}

local rootGui
local boardFrame
local statusLabel
local capturedLabel

local pieceText = {
	wp = "P", wn = "N", wb = "B", wr = "R", wq = "Q", wk = "K",
	bp = "P", bn = "N", bb = "B", br = "R", bq = "Q", bk = "K",
}

local startPosition = {
	a1 = "wr", b1 = "wn", c1 = "wb", d1 = "wq", e1 = "wk", f1 = "wb", g1 = "wn", h1 = "wr",
	a2 = "wp", b2 = "wp", c2 = "wp", d2 = "wp", e2 = "wp", f2 = "wp", g2 = "wp", h2 = "wp",
	a7 = "bp", b7 = "bp", c7 = "bp", d7 = "bp", e7 = "bp", f7 = "bp", g7 = "bp", h7 = "bp",
	a8 = "br", b8 = "bn", c8 = "bb", d8 = "bq", e8 = "bk", f8 = "bb", g8 = "bn", h8 = "br",
}

local function pieceColor(piece)
	return string.sub(piece, 1, 1)
end

local function pieceKind(piece)
	return string.sub(piece, 2, 2)
end

local function fileIndex(file)
	return string.byte(file) - string.byte("a") + 1
end

local function squareName(file, rank)
	return string.char(string.byte("a") + file - 1) .. tostring(rank)
end

local function parseSquare(square)
	return fileIndex(string.sub(square, 1, 1)), tonumber(string.sub(square, 2, 2))
end

local function onBoard(file, rank)
	return file >= 1 and file <= 8 and rank >= 1 and rank <= 8
end

local function isEnemy(piece, other)
	return piece and other and pieceColor(piece) ~= pieceColor(other)
end

local function addMove(moves, from, to)
	table.insert(moves, { from = from, to = to })
end

local function addSlidingMoves(moves, from, piece, directions)
	local file, rank = parseSquare(from)
	for _, direction in ipairs(directions) do
		local df, dr = direction[1], direction[2]
		local f = file + df
		local r = rank + dr
		while onBoard(f, r) do
			local target = squareName(f, r)
			local occupant = board[target]
			if not occupant then
				addMove(moves, from, target)
			else
				if isEnemy(piece, occupant) then
					addMove(moves, from, target)
				end
				break
			end
			f = f + df
			r = r + dr
		end
	end
end

local function legalMovesFrom(square)
	local piece = board[square]
	local moves = {}
	if not piece or pieceColor(piece) ~= turn then return moves end

	local color = pieceColor(piece)
	local kind = pieceKind(piece)
	local file, rank = parseSquare(square)
	local forward = color == "w" and 1 or -1
	local startRank = color == "w" and 2 or 7

	if kind == "p" then
		local oneRank = rank + forward
		if onBoard(file, oneRank) and not board[squareName(file, oneRank)] then
			addMove(moves, square, squareName(file, oneRank))
			local twoRank = rank + forward * 2
			if rank == startRank and onBoard(file, twoRank) and not board[squareName(file, twoRank)] then
				addMove(moves, square, squareName(file, twoRank))
			end
		end
		for _, df in ipairs({ -1, 1 }) do
			local f = file + df
			local r = rank + forward
			if onBoard(f, r) then
				local target = squareName(f, r)
				if isEnemy(piece, board[target]) then
					addMove(moves, square, target)
				end
			end
		end
	elseif kind == "n" then
		local jumps = {
			{ 1, 2 }, { 2, 1 }, { 2, -1 }, { 1, -2 },
			{ -1, -2 }, { -2, -1 }, { -2, 1 }, { -1, 2 },
		}
		for _, jump in ipairs(jumps) do
			local f = file + jump[1]
			local r = rank + jump[2]
			if onBoard(f, r) then
				local target = squareName(f, r)
				if not board[target] or isEnemy(piece, board[target]) then
					addMove(moves, square, target)
				end
			end
		end
	elseif kind == "b" then
		addSlidingMoves(moves, square, piece, { { 1, 1 }, { 1, -1 }, { -1, 1 }, { -1, -1 } })
	elseif kind == "r" then
		addSlidingMoves(moves, square, piece, { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } })
	elseif kind == "q" then
		addSlidingMoves(moves, square, piece, {
			{ 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 },
			{ 1, 1 }, { 1, -1 }, { -1, 1 }, { -1, -1 },
		})
	elseif kind == "k" then
		for df = -1, 1 do
			for dr = -1, 1 do
				if df ~= 0 or dr ~= 0 then
					local f = file + df
					local r = rank + dr
					if onBoard(f, r) then
						local target = squareName(f, r)
						if not board[target] or isEnemy(piece, board[target]) then
							addMove(moves, square, target)
						end
					end
				end
			end
		end
	end

	return moves
end

local function isLegalTarget(square)
	for _, move in ipairs(legalTargets) do
		if move.to == square then
			return true
		end
	end
	return false
end

local function baseSquareColor(square)
	local file, rank = parseSquare(square)
	return (file + rank) % 2 == 0 and LIGHT or DARK
end

local function updateCapturedLabel()
	local whiteText = #capturedWhite > 0 and table.concat(capturedWhite, " ") or "-"
	local blackText = #capturedBlack > 0 and table.concat(capturedBlack, " ") or "-"
	capturedLabel.Text = "White captured: " .. whiteText .. "\nBlack captured: " .. blackText
end

local function setStatus(message)
	statusLabel.Text = message
end

local function drawBoard()
	for square, button in pairs(squareButtons) do
		local piece = board[square]
		button.BackgroundColor3 = baseSquareColor(square)
		button.Text = piece and pieceText[piece] or ""
		button.TextColor3 = piece and (pieceColor(piece) == "w" and Color3.fromRGB(246, 246, 240) or Color3.fromRGB(22, 24, 28)) or Color3.fromRGB(0, 0, 0)
		button.TextStrokeTransparency = piece and 0.35 or 1
	end

	if selectedSquare and squareButtons[selectedSquare] then
		squareButtons[selectedSquare].BackgroundColor3 = SELECTED
	end

	for _, move in ipairs(legalTargets) do
		local button = squareButtons[move.to]
		if button then
			button.BackgroundColor3 = board[move.to] and CAPTURE_TARGET or MOVE_TARGET
		end
	end

	local side = turn == "w" and "White" or "Black"
	setStatus("Chess.JP 2D - " .. side .. " to move. Move " .. tostring(moveNumber))
	updateCapturedLabel()
end

local function makeMove(from, to)
	local piece = board[from]
	local captured = board[to]
	if captured then
		local capturedName = string.upper(pieceColor(captured)) .. pieceText[captured]
		if pieceColor(piece) == "w" then
			table.insert(capturedWhite, capturedName)
		else
			table.insert(capturedBlack, capturedName)
		end
	end

	board[to] = piece
	board[from] = nil

	local _, toRank = parseSquare(to)
	if pieceKind(piece) == "p" and (toRank == 1 or toRank == 8) then
		board[to] = pieceColor(piece) .. "q"
	end

	selectedSquare = nil
	legalTargets = {}
	turn = turn == "w" and "b" or "w"
	if turn == "w" then
		moveNumber = moveNumber + 1
	end
	drawBoard()
end

local function handleSquareClick(square)
	if selectedSquare and isLegalTarget(square) then
		makeMove(selectedSquare, square)
		return
	end

	local piece = board[square]
	if piece and pieceColor(piece) == turn then
		selectedSquare = square
		legalTargets = legalMovesFrom(square)
		drawBoard()
		setStatus("Selected " .. string.upper(pieceColor(piece)) .. pieceText[piece] .. " on " .. square)
		return
	end

	selectedSquare = nil
	legalTargets = {}
	drawBoard()
end

local function resetGame()
	board = {}
	selectedSquare = nil
	legalTargets = {}
	turn = "w"
	moveNumber = 1
	capturedWhite = {}
	capturedBlack = {}
	for square, piece in pairs(startPosition) do
		board[square] = piece
	end
	drawBoard()
end

local function makeText(parent, text, size, position, fontSize)
	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Size = size
	label.Position = position
	label.Font = Enum.Font.GothamBold
	label.Text = text
	label.TextSize = fontSize
	label.TextColor3 = Color3.fromRGB(242, 239, 230)
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Parent = parent
	return label
end

local function buildGui()
	if rootGui then
		rootGui:Destroy()
	end

	rootGui = Instance.new("ScreenGui")
	rootGui.Name = "ChessJP_2D"
	rootGui.ResetOnSpawn = false
	rootGui.IgnoreGuiInset = true
	rootGui.Parent = player:WaitForChild("PlayerGui")

	local background = Instance.new("Frame")
	background.Name = "Background"
	background.Size = UDim2.fromScale(1, 1)
	background.BackgroundColor3 = Color3.fromRGB(26, 32, 36)
	background.Parent = rootGui

	boardFrame = Instance.new("Frame")
	boardFrame.Name = "Board"
	boardFrame.AnchorPoint = Vector2.new(0.5, 0.5)
	boardFrame.Position = UDim2.fromScale(0.43, 0.52)
	boardFrame.Size = UDim2.fromOffset(560, 560)
	boardFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
	boardFrame.BorderSizePixel = 0
	boardFrame.Parent = background

	local boardAspect = Instance.new("UIAspectRatioConstraint")
	boardAspect.AspectRatio = 1
	boardAspect.Parent = boardFrame

	local grid = Instance.new("UIGridLayout")
	grid.CellPadding = UDim2.fromOffset(0, 0)
	grid.CellSize = UDim2.fromScale(1 / BOARD_SIZE, 1 / BOARD_SIZE)
	grid.SortOrder = Enum.SortOrder.LayoutOrder
	grid.Parent = boardFrame

	squareButtons = {}
	for rank = 8, 1, -1 do
		for file = 1, BOARD_SIZE do
			local square = squareName(file, rank)
			local button = Instance.new("TextButton")
			button.Name = square
			button.LayoutOrder = (8 - rank) * 8 + file
			button.AutoButtonColor = false
			button.BorderSizePixel = 0
			button.Font = Enum.Font.GothamBlack
			button.TextScaled = true
			button.Parent = boardFrame
			button.MouseButton1Click:Connect(function()
				handleSquareClick(square)
			end)
			squareButtons[square] = button
		end
	end

	local panel = Instance.new("Frame")
	panel.Name = "SidePanel"
	panel.AnchorPoint = Vector2.new(0, 0.5)
	panel.Position = UDim2.fromScale(0.72, 0.52)
	panel.Size = UDim2.fromOffset(300, 560)
	panel.BackgroundColor3 = Color3.fromRGB(39, 47, 52)
	panel.BorderSizePixel = 0
	panel.Parent = background

	local panelCorner = Instance.new("UICorner")
	panelCorner.CornerRadius = UDim.new(0, 8)
	panelCorner.Parent = panel

	makeText(panel, "Chess.JP", UDim2.fromOffset(260, 50), UDim2.fromOffset(22, 22), 34)
	statusLabel = makeText(panel, "", UDim2.fromOffset(260, 90), UDim2.fromOffset(22, 90), 20)
	capturedLabel = makeText(panel, "", UDim2.fromOffset(260, 120), UDim2.fromOffset(22, 190), 18)

	local restart = Instance.new("TextButton")
	restart.Name = "Restart"
	restart.Size = UDim2.fromOffset(250, 54)
	restart.Position = UDim2.fromOffset(22, 470)
	restart.BackgroundColor3 = Color3.fromRGB(86, 150, 229)
	restart.BorderSizePixel = 0
	restart.Font = Enum.Font.GothamBold
	restart.Text = "Restart"
	restart.TextSize = 22
	restart.TextColor3 = Color3.fromRGB(255, 255, 255)
	restart.Parent = panel
	restart.MouseButton1Click:Connect(resetGame)

	local restartCorner = Instance.new("UICorner")
	restartCorner.CornerRadius = UDim.new(0, 6)
	restartCorner.Parent = restart

	resetGame()
end

buildGui()
