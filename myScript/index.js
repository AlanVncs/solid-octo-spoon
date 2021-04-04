const alanScript = (scenery, myMove) => {
	const DRAW_CODE = 'T'

	const ENEMY = {
		X: 'O',
		O: 'X',
	}

	const COMPARATORS = {
		X: (a, b) => b.winner.charCodeAt(0) - a.winner.charCodeAt(0),
		O: (a, b) => a.winner.charCodeAt(0) - b.winner.charCodeAt(0),
	}

	function getRowWinner(scenery, i) {
		const rowSum =
			scenery[i * 3 + 0].charCodeAt(0) +
			scenery[i * 3 + 1].charCodeAt(0) +
			scenery[i * 3 + 2].charCodeAt(0)

		return rowSum / 3 == scenery[i * 3].charCodeAt(0)
	}

	function getColumnWinner(scenery, j) {
		const columnSum =
			scenery[j + 0].charCodeAt(0) +
			scenery[j + 3].charCodeAt(0) +
			scenery[j + 6].charCodeAt(0)

		return columnSum / 3 == scenery[j].charCodeAt(0)
	}

	function getWinner(scenery) {
		// 'X' - X é o vencedor
		// 'O' - O é o vencedor
		// 'T' - Empate
		// false - O jogo ainda não acabou

		// Row
		for (let i = 0; i < 3; i++) {
			if (getRowWinner(scenery, i)) {
				return scenery[i * 3]
			}
		}

		// Column
		for (let j = 0; j < 3; j++) {
			if (getColumnWinner(scenery, j)) {
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

		const drawGame = scenery.every((cell) => cell != '')

		return drawGame && DRAW_CODE
	}

	function genScenery(scenery, myMove, position) {
		const newScenery = [...scenery]
		newScenery[position] = myMove
		return newScenery
	}

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

	const move = minmax(scenery, myMove)
	return move.position
}

export default alanScript
