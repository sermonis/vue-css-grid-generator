const getters = {
	gridStyle: state => (grid) => {
		let height = state[grid].height;
		if (/\d+(\.\d+)?%/.test(height)) height = '100%';
		let width = state[grid].width;
		if (/\d+(\.\d+)?%/.test(width)) width = '100%';
		return {
			height: height,
			width: width,
			gridColumnGap: state[grid].columnsGap,
			gridRowGap: state[grid].rowsGap,
			gridTemplateColumns: state[grid].templateColumns.join(' '),
			gridTemplateRows: state[grid].templateRows.join(' '),
			gridAutoFlow: state[grid].gridAutoFlow,
			justifyContent: state[grid].justifyContent,
			justifyItems: state[grid].justifyItems,
			alignContent: state[grid].alignContent,
			alignItems: state[grid].alignItems
		}
	},
	containerStyles: (state, getters) => grid => {
		if (state[grid].container) {
		console.log(state.container);
		return {
			width: state.container.width,
			height: state.container.height
		}}
	},
	cellStyles: (state, getters) => (grid) => {
		let styles = [];
		state[grid].items.map((item) => {
			if (item.subGrid) {
				styles.push({
					gridColumn: item.fromCol + '/' + (!isNaN(parseInt(item.toCol)) ? parseInt(item.toCol) + 1 : item.toCol),
					gridRow: item.fromRow + '/' + (!isNaN(parseInt(item.toRow)) ? parseInt(item.toRow) + 1 : item.toRow),
					justifySelf: item.justifySelf,
					alignSelf: item.alignSelf,
					... getters.gridStyle(item.subGrid),
					display: 'inline-grid'
				})
			} else {
				styles.push({
					gridColumn: item.fromCol + '/' + (!isNaN(parseInt(item.toCol)) ? parseInt(item.toCol) + 1 : item.toCol),
					gridRow: item.fromRow + '/' + (!isNaN(parseInt(item.toRow)) ? parseInt(item.toRow) + 1 : item.toRow),
					justifySelf: item.justifySelf,
					alignSelf: item.alignSelf,
				})
			}
		});
		return styles;
	},
	cellsSubGrids: (state, getters) => grid => {
		let items = [];
		state[grid].items.map((item) => {
			if (item.subGrid) {
				items.push(item.subGrid);
			} else {
				items.push(null);
			}
		})
		return items;
	},
	gridCellsCount: state => (grid) => state[grid].columns * state[grid].rows,
	fields: state => (origin, grid) => {
		if (origin === 'columns') {
			return state[grid].templateColumns
		} else if (origin === 'rows') {
			return state[grid].templateRows
		}
	},
}

export default getters