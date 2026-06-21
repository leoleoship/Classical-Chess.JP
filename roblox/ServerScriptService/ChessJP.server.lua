-- Chess.JP Roblox Starter
-- Put this Script inside ServerScriptService in Roblox Studio.

local Players = game:GetService("Players")

local BOARD_SIZE = 8
local SQUARE_SIZE = 7
local BOARD_Y = 2
local ORIGIN = Vector3.new(-24.5, BOARD_Y, -24.5)

local boardFolder = Instance.new("Folder")
boardFolder.Name = "ChessJP_Board"
boardFolder.Parent = workspace

local uiFolder = Instance.new("Folder")
uiFolder.Name = "ChessJP_UI"
uiFolder.Parent = workspace

local board = {}
local squares = {}
local pieces = {}
local selectedSquare = nil
local legalTargets = {}
local turn = "w"
local moveNumber = 1
local capturedWhite = {}
local capturedBlack = {}
local statusLabel = nil
local capturedLabel = nil

local pieceNames = {
	wp = "P", wn = "N", wb = "B", wr = "R", wq = "Q", wk = "K",
	bp = "P", bn = "N", bb = "B", br = "R", bq = "Q", bk = "K",
}

local pieceValues = {
	p = 1, n = 3, b = 3, r = 5, q = 9, k = 100,
}

local startPosition = {
	a1 = "wr", b1 = "wn", c1 = "wb", d1 = "wq", e1 = "wk", f1 = "wb", g1 = "wn", h1 = "wr",
	a2 = "wp", b2 = "wp", c2 = "wp", d2 = "wp", e2 = "wp", f2 = "wp", g2 = "wp", h2 = "wp",
	a7 = "bp", b7 = "bp", c7 = "bp", d7 = "bp", e7 = "bp", f7 = "bp", g7 = "bp", h7 = "bp",
	a8 = "br", b8 = "bn", c8 = "bb", d8 = "bq", e8 = "bk", f8 = "bb", g8 = "bn", h8 = "br",
}

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

local function squarePosition(square)
	local file, rank = parseSquare(square)
	return ORIGIN + Vector3.new((file - 1) * SQUARE_SIZE, 0, (8 - rank) * SQUARE_SIZE)
end

local function clearFolder(folder)
	for _, child in ipairs(folder:GetChildren()) do
		child:Destroy()
	end
end

local function setStatus(message)
	if statusLabel then
		statusLabel.Text = message
	end
end

local function updateCapturedLabel()
	if not capturedLabel then return end
	local whiteText = #capturedWhite > 0 and table.concat(capturedWhite, " ") or "-"
	local blackText = #capturedBlack > 0 and table.concat(capturedBlack, " ") or "-"
	capturedLabel.Text = "White captured: " .. whiteText .. "\nBlack captured: " .. blackText
end

local function pieceColor(piece)
	return string.sub(piece, 1, 1)
end

local function pieceKind(piece)
	return string.sub(piece, 2, 2)
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
			if rank == startRank and not board[squareName(file, twoRank)] then
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

local function isLegalTarget(target)
	for _, move in ipairs(legalTargets) do
		if move.to == target then
			return true
		end
	end
	return false
end

local function resetSquareColors()
	for square, part in pairs(squares) do
		local file, rank = parseSquare(square)
		local light = (file + rank) % 2 == 0
		part.Color = light and Color3.fromRGB(235, 217, 184) or Color3.fromRGB(111, 139, 96)
	end
end

local function highlightSelection()
	resetSquareColors()
	if selectedSquare and squares[selectedSquare] then
		squares[selectedSquare].Color = Color3.fromRGB(244, 213, 72)
	end
	for _, move in ipairs(legalTargets) do
		if squares[move.to] then
			squares[move.to].Color = board[move.to] and Color3.fromRGB(223, 82, 70) or Color3.fromRGB(110, 190, 110)
		end
	end
end

local function createBillboard(parent, text, size)
	local billboard = Instance.new("BillboardGui")
	billboard.Name = "Label"
	billboard.Size = UDim2.fromOffset(size, size)
	billboard.StudsOffset = Vector3.new(0, 3, 0)
	billboard.AlwaysOnTop = true
	billboard.Parent = parent

	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Size = UDim2.fromScale(1, 1)
	label.Text = text
	label.TextScaled = true
	label.Font = Enum.Font.GothamBold
	label.TextColor3 = Color3.fromRGB(20, 20, 20)
	label.Parent = billboard

	return label
end

local function destroyPiece(square)
	if pieces[square] then
		pieces[square]:Destroy()
		pieces[square] = nil
	end
end

local function createPiece(square, piece)
	destroyPiece(square)

	local model = Instance.new("Model")
	model.Name = piece .. "_" .. square
	model.Parent = boardFolder

	local base = Instance.new("Part")
	base.Name = "Piece"
	base.Shape = Enum.PartType.Cylinder
	base.Size = Vector3.new(3.2, 3.2, 3.2)
	base.Anchored = true
	base.CanCollide = false
	base.Position = squarePosition(square) + Vector3.new(0, 2.4, 0)
	base.Orientation = Vector3.new(0, 0, 90)
	base.Color = pieceColor(piece) == "w" and Color3.fromRGB(244, 244, 235) or Color3.fromRGB(38, 42, 46)
	base.Parent = model

	local top = Instance.new("Part")
	top.Name = "Top"
	top.Shape = Enum.PartType.Ball
	top.Size = Vector3.new(2.4, 2.4, 2.4)
	top.Anchored = true
	top.CanCollide = false
	top.Position = squarePosition(square) + Vector3.new(0, 4.2, 0)
	top.Color = base.Color
	top.Parent = model

	local label = createBillboard(top, string.upper(pieceColor(piece)) .. pieceNames[piece], 80)
	label.TextColor3 = pieceColor(piece) == "w" and Color3.fromRGB(20, 20, 20) or Color3.fromRGB(255, 255, 255)

	local click = Instance.new("ClickDetector")
	click.MaxActivationDistance = 80
	click.Parent = top
	click.MouseClick:Connect(function()
		handleSquareClick(square)
	end)

	pieces[square] = model
end

function renderPieces()
	for square in pairs(pieces) do
		destroyPiece(square)
	end
	for square, piece in pairs(board) do
		createPiece(square, piece)
	end
	updateCapturedLabel()
	local side = turn == "w" and "White" or "Black"
	setStatus("Chess.JP Roblox - " .. side .. " to move. Move " .. tostring(moveNumber))
end

local function makeMove(from, to)
	local piece = board[from]
	local captured = board[to]
	if captured then
		local entry = string.upper(pieceColor(captured)) .. pieceNames[captured]
		if pieceColor(piece) == "w" then
			table.insert(capturedWhite, entry)
		else
			table.insert(capturedBlack, entry)
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
	renderPieces()
	highlightSelection()
end

function handleSquareClick(square)
	local piece = board[square]

	if selectedSquare and isLegalTarget(square) then
		makeMove(selectedSquare, square)
		return
	end

	if piece and pieceColor(piece) == turn then
		selectedSquare = square
		legalTargets = legalMovesFrom(square)
		highlightSelection()
		setStatus("Selected " .. string.upper(pieceColor(piece)) .. pieceNames[piece] .. " on " .. square)
		return
	end

	selectedSquare = nil
	legalTargets = {}
	highlightSelection()
end

local function createSquare(square)
	local part = Instance.new("Part")
	part.Name = square
	part.Anchored = true
	part.Size = Vector3.new(SQUARE_SIZE, 0.5, SQUARE_SIZE)
	part.Position = squarePosition(square)
	part.TopSurface = Enum.SurfaceType.Smooth
	part.BottomSurface = Enum.SurfaceType.Smooth
	part.Parent = boardFolder

	local click = Instance.new("ClickDetector")
	click.MaxActivationDistance = 80
	click.Parent = part
	click.MouseClick:Connect(function()
		handleSquareClick(square)
	end)

	squares[square] = part
end

local function createWorldLabels()
	local sign = Instance.new("Part")
	sign.Name = "ChessJP_StatusSign"
	sign.Anchored = true
	sign.CanCollide = false
	sign.Size = Vector3.new(34, 8, 1)
	sign.Position = Vector3.new(0, 10, -36)
	sign.Color = Color3.fromRGB(30, 38, 45)
	sign.Parent = uiFolder

	statusLabel = createBillboard(sign, "Chess.JP Roblox", 260)
	statusLabel.TextColor3 = Color3.fromRGB(255, 255, 255)

	local capturedSign = Instance.new("Part")
	capturedSign.Name = "ChessJP_CapturedSign"
	capturedSign.Anchored = true
	capturedSign.CanCollide = false
	capturedSign.Size = Vector3.new(34, 8, 1)
	capturedSign.Position = Vector3.new(0, 10, 34)
	capturedSign.Color = Color3.fromRGB(45, 36, 30)
	capturedSign.Parent = uiFolder

	capturedLabel = createBillboard(capturedSign, "White captured: -\nBlack captured: -", 260)
	capturedLabel.TextColor3 = Color3.fromRGB(255, 255, 255)

	local restart = Instance.new("Part")
	restart.Name = "Restart_Game"
	restart.Anchored = true
	restart.Size = Vector3.new(16, 2, 6)
	restart.Position = Vector3.new(31, 2, -31)
	restart.Color = Color3.fromRGB(80, 150, 230)
	restart.Parent = uiFolder
	local restartLabel = createBillboard(restart, "Restart", 120)
	restartLabel.TextColor3 = Color3.fromRGB(255, 255, 255)

	local click = Instance.new("ClickDetector")
	click.MaxActivationDistance = 80
	click.Parent = restart
	click.MouseClick:Connect(function()
		resetGame()
	end)
end

function resetGame()
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
	renderPieces()
	highlightSelection()
end

local function buildBoard()
	clearFolder(boardFolder)
	clearFolder(uiFolder)
	squares = {}
	pieces = {}

	for file = 1, BOARD_SIZE do
		for rank = 1, BOARD_SIZE do
			createSquare(squareName(file, rank))
		end
	end

	createWorldLabels()
	resetGame()
end

buildBoard()

Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		task.wait(0.5)
		local root = character:FindFirstChild("HumanoidRootPart")
		if root then
			root.CFrame = CFrame.new(0, 8, 48)
		end
	end)
end)
