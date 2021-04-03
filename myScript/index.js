const DRAW_CODE = 'T'

const ENEMY = {
	X: 'O',
	O: 'X',
}

const COMPARATORS = {
	X: (a, b) => b.winner.charCodeAt(0) - a.winner.charCodeAt(0),
	O: (a, b) => a.winner.charCodeAt(0) - b.winner.charCodeAt(0),
}

function hasRowWinner(scenery, i) {
	const rowSum =
		scenery[i * 3 + 0].charCodeAt(0) +
		scenery[i * 3 + 1].charCodeAt(0) +
		scenery[i * 3 + 2].charCodeAt(0)

	return rowSum / 3 == scenery[i * 3].charCodeAt(0)
}

function hasColumnWinner(scenery, j) {
	const columnSum =
		scenery[j + 0].charCodeAt(0) + scenery[j + 3].charCodeAt(0) + scenery[j + 6].charCodeAt(0)

	return columnSum / 3 == scenery[j].charCodeAt(0)
}

function getWinner(scenery) {
	// Valores de retorno:
	// 'X' - X é o vencedor
	// 'O' - O é o vencedor
	// 'T' - Empate
	// false - O jogo ainda não acabou

	// Row
	for (let i = 0; i < 3; i++) {
		if (hasRowWinner(scenery, i)) {
			return scenery[i * 3]
		}
	}

	// Column
	for (let j = 0; j < 3; j++) {
		if (hasColumnWinner(scenery, j)) {
			return scenery[j]
		}
	}

	// Diagonal
	const diagonalASum =
		scenery[0].charCodeAt(0) + scenery[4].charCodeAt(0) + scenery[8].charCodeAt(0)

	const diagonalBSum =
		scenery[6].charCodeAt(0) + scenery[4].charCodeAt(0) + scenery[2].charCodeAt(0)

	if (
		diagonalASum / 3 == scenery[4].charCodeAt(0) ||
		diagonalBSum / 3 == scenery[4].charCodeAt(0)
	) {
		return scenery[4]
	}

	const sceneryFull = scenery.every((cell) => cell != '')

	return sceneryFull && DRAW_CODE
}

// Gera um novo cenário de com os parâmetros
function genScenery(scenery, myMove, position) {
	const newScenery = [...scenery]
	newScenery[position] = myMove
	return newScenery
}

// Testa todos os movimentos possíveis e retorna o melhor
function minmax(scenery, myMove) {
	const winner = getWinner(scenery)
	if (winner) return { position: null, winner }

	const moves = []
	scenery.forEach((element, position) => {
		if (element === '') {
			const newScenery = genScenery(scenery, myMove, position)
			const move = minmax(newScenery, ENEMY[myMove])
			move.position = position
			moves.push(move)
		}
	})

	// Ordena as possibilidades de acordo com o 'myMove'
	const comparator = COMPARATORS[myMove]
	moves.sort(comparator)

	const bestMove = moves[0]

	return bestMove
}

const alanScript = (scenery, myMove) => {
	const move = minmax(scenery, myMove)
	console.log(move)
	return move.position
}

export default alanScript
