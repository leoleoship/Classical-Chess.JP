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
local moveHistory = {}
local currentTheme = "classic"

local rootGui
local backgroundFrame
local boardFrame
local sidePanel
local statusLabel
local capturedLabel
local ratingLabel
local moveHistoryLabel
local themeLabel

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

local themes = {
	classic = {
		name = "Classic",
		light = Color3.fromRGB(238, 219, 186),
		dark = Color3.fromRGB(118, 150, 97),
		background = Color3.fromRGB(26, 32, 36),
		panel = Color3.fromRGB(39, 47, 52),
	},
	candyland = {
		name = "Candyland",
		light = Color3.fromRGB(255, 220, 236),
		dark = Color3.fromRGB(124, 201, 211),
		background = Color3.fromRGB(53, 42, 66),
		panel = Color3.fromRGB(78, 58, 94),
	},
	sunburst = {
		name = "Sunburst",
		light = Color3.fromRGB(255, 231, 151),
		dark = Color3.fromRGB(214, 109, 74),
		background = Color3.fromRGB(46, 42, 32),
		panel = Color3.fromRGB(69, 57, 39),
	},
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
	local theme = themes[currentTheme]
	return (file + rank) % 2 == 0 and theme.light or theme.dark
end

local function updateCapturedLabel()
	if not capturedLabel then return end
	local whiteText = #capturedWhite > 0 and table.concat(capturedWhite, " ") or "-"
	local blackText = #capturedBlack > 0 and table.concat(capturedBlack, " ") or "-"
	capturedLabel.Text = "White captured: " .. whiteText .. "\nBlack captured: " .. blackText
end

local function setStatus(message)
	if not statusLabel then return end
	statusLabel.Text = message
end

local function setRating(text, color)
	if not ratingLabel then return end
	ratingLabel.Text = text
	ratingLabel.TextColor3 = color or Color3.fromRGB(242, 239, 230)
end

local function updateMoveHistory()
	if not moveHistoryLabel then return end
	if #moveHistory == 0 then
		moveHistoryLabel.Text = "No moves yet."
		return
	end

	local rows = {}
	for index, item in ipairs(moveHistory) do
		local moveSide = index % 2 == 1 and tostring(math.floor((index + 1) / 2)) .. ". " or ""
		table.insert(rows, moveSide .. item)
	end
	moveHistoryLabel.Text = table.concat(rows, "\n")
end

local function scoreMove(piece, captured, from, to)
	if captured and pieceKind(captured) == "q" then
		return "Brilliant", Color3.fromRGB(80, 220, 255)
	end
	if captured then
		return "Good", Color3.fromRGB(107, 226, 141)
	end
	if pieceKind(piece) == "n" or pieceKind(piece) == "b" then
		return "Good", Color3.fromRGB(107, 226, 141)
	end
	if from == to then
		return "Bad", Color3.fromRGB(240, 100, 95)
	end
	return "So-So", Color3.fromRGB(238, 211, 103)
end

local function formatMove(piece, from, to, captured)
	local captureMark = captured and "x" or "-"
	return pieceText[piece] .. from .. captureMark .. to
end

local function drawBoard()
	if backgroundFrame then
		backgroundFrame.BackgroundColor3 = themes[currentTheme].background
	end
	if sidePanel then
		sidePanel.BackgroundColor3 = themes[currentTheme].panel
	end

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
	setStatus(side .. " to move. Move " .. tostring(moveNumber))
	updateCapturedLabel()
	updateMoveHistory()
	if themeLabel then
		themeLabel.Text = "Theme: " .. themes[currentTheme].name
	end
end

local function makeMove(from, to)
	local piece = board[from]
	local captured = board[to]
	local ratingText, ratingColor = scoreMove(piece, captured, from, to)
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

	table.insert(moveHistory, formatMove(piece, from, to, captured))
	setRating(ratingText, ratingColor)

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
	moveHistory = {}
	for square, piece in pairs(startPosition) do
		board[square] = piece
	end
	setRating("-", Color3.fromRGB(242, 239, 230))
	drawBoard()
end

local function makeText(parent, text, size, position, fontSize, color)
	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Size = size
	label.Position = position
	label.Font = Enum.Font.GothamBold
	label.Text = text
	label.TextSize = fontSize
	label.TextColor3 = color or Color3.fromRGB(242, 239, 230)
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.TextYAlignment = Enum.TextYAlignment.Top
	label.Parent = parent
	return label
end

local function makePanel(parent, name, size, position)
	local panel = Instance.new("Frame")
	panel.Name = name
	panel.Size = size
	panel.Position = position
	panel.BackgroundColor3 = Color3.fromRGB(31, 38, 43)
	panel.BorderSizePixel = 0
	panel.Parent = parent

	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 8)
	corner.Parent = panel

	return panel
end

local function makeButton(parent, text, size, position, callback)
	local button = Instance.new("TextButton")
	button.Size = size
	button.Position = position
	button.BackgroundColor3 = Color3.fromRGB(65, 78, 86)
	button.BorderSizePixel = 0
	button.Font = Enum.Font.GothamBold
	button.Text = text
	button.TextSize = 15
	button.TextColor3 = Color3.fromRGB(245, 242, 235)
	button.Parent = parent

	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 6)
	corner.Parent = button

	button.MouseButton1Click:Connect(callback)
	return button
end

local function cycleTheme()
	if currentTheme == "classic" then
		currentTheme = "candyland"
	elseif currentTheme == "candyland" then
		currentTheme = "sunburst"
	else
		currentTheme = "classic"
	end
	drawBoard()
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

	backgroundFrame = Instance.new("Frame")
	backgroundFrame.Name = "Background"
	backgroundFrame.Size = UDim2.fromScale(1, 1)
	backgroundFrame.BackgroundColor3 = themes[currentTheme].background
	backgroundFrame.Parent = rootGui

	boardFrame = Instance.new("Frame")
	boardFrame.Name = "Board"
	boardFrame.AnchorPoint = Vector2.new(0.5, 0.5)
	boardFrame.Position = UDim2.fromScale(0.43, 0.52)
	boardFrame.Size = UDim2.fromOffset(560, 560)
	boardFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
	boardFrame.BorderSizePixel = 0
	boardFrame.Parent = backgroundFrame

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
	panel.Position = UDim2.fromScale(0.71, 0.52)
	panel.Size = UDim2.fromOffset(340, 620)
	panel.BackgroundColor3 = themes[currentTheme].panel
	panel.BorderSizePixel = 0
	panel.Parent = backgroundFrame
	sidePanel = panel

	local panelCorner = Instance.new("UICorner")
	panelCorner.CornerRadius = UDim.new(0, 8)
	panelCorner.Parent = panel

	makeText(panel, "Classical-chess.jp", UDim2.fromOffset(290, 22), UDim2.fromOffset(22, 18), 14, Color3.fromRGB(177, 190, 183))
	makeText(panel, "Chess.JP", UDim2.fromOffset(290, 48), UDim2.fromOffset(22, 42), 36)
	statusLabel = makeText(panel, "", UDim2.fromOffset(290, 46), UDim2.fromOffset(22, 90), 18)

	local modePanel = makePanel(panel, "ModePanel", UDim2.fromOffset(296, 74), UDim2.fromOffset(22, 136))
	makeText(modePanel, "Mode", UDim2.fromOffset(260, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	makeButton(modePanel, "Human", UDim2.fromOffset(84, 32), UDim2.fromOffset(12, 34), function()
		setStatus("Human mode is active.")
	end)
	makeButton(modePanel, "Bot", UDim2.fromOffset(84, 32), UDim2.fromOffset(106, 34), function()
		setStatus("Bot mode will be added next.")
	end)
	makeButton(modePanel, "Puzzle", UDim2.fromOffset(84, 32), UDim2.fromOffset(200, 34), function()
		setStatus("Puzzle mode will be ported from GitHub next.")
	end)

	local settingsPanel = makePanel(panel, "SettingsPanel", UDim2.fromOffset(296, 78), UDim2.fromOffset(22, 222))
	makeText(settingsPanel, "Settings", UDim2.fromOffset(260, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	themeLabel = makeText(settingsPanel, "", UDim2.fromOffset(160, 26), UDim2.fromOffset(12, 40), 16)
	makeButton(settingsPanel, "Theme", UDim2.fromOffset(90, 34), UDim2.fromOffset(194, 32), cycleTheme)

	local ratingPanel = makePanel(panel, "RatingPanel", UDim2.fromOffset(142, 74), UDim2.fromOffset(22, 312))
	makeText(ratingPanel, "Move Rating", UDim2.fromOffset(118, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	ratingLabel = makeText(ratingPanel, "-", UDim2.fromOffset(118, 34), UDim2.fromOffset(12, 34), 24)

	local capturedPanel = makePanel(panel, "CapturedPanel", UDim2.fromOffset(142, 74), UDim2.fromOffset(176, 312))
	makeText(capturedPanel, "Captured", UDim2.fromOffset(118, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	capturedLabel = makeText(capturedPanel, "", UDim2.fromOffset(118, 44), UDim2.fromOffset(12, 30), 13)

	local controlsPanel = makePanel(panel, "ControlsPanel", UDim2.fromOffset(296, 72), UDim2.fromOffset(22, 398))
	makeText(controlsPanel, "Controls", UDim2.fromOffset(260, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	makeButton(controlsPanel, "Restart", UDim2.fromOffset(84, 32), UDim2.fromOffset(12, 32), resetGame)
	makeButton(controlsPanel, "Reload", UDim2.fromOffset(84, 32), UDim2.fromOffset(106, 32), resetGame)
	makeButton(controlsPanel, "Resign", UDim2.fromOffset(84, 32), UDim2.fromOffset(200, 32), function()
		setStatus((turn == "w" and "White" or "Black") .. " resigned.")
	end)

	local historyPanel = makePanel(panel, "HistoryPanel", UDim2.fromOffset(296, 118), UDim2.fromOffset(22, 482))
	makeText(historyPanel, "Move History", UDim2.fromOffset(260, 20), UDim2.fromOffset(12, 8), 14, Color3.fromRGB(177, 190, 183))
	moveHistoryLabel = makeText(historyPanel, "No moves yet.", UDim2.fromOffset(260, 82), UDim2.fromOffset(12, 32), 14)

	resetGame()
end

buildGui()
