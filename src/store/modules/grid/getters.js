const getters = {
	gridStyle: state => (grid) => {
		let height = state[grid].height;
		let width = state[grid].width;
		if(grid === 'root') {
			if (/\d+(\.\d+)?%/.test(height)) height = '100%';
			if (/\d+(\.\d+)?%/.test(width)) width = '100%';
		}
		let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/gm;
		if (width !== 'auto' && width !== 'auto' && !/\d+(\.\d+)?%/.test(width)) {
			let group = width.split(divideIntoGroups)
			let value = parseFloat(group[1]);
			let unit = group[6]
			width = value * parseFloat(state.zoom) + unit;
		}
		if (height !== 'auto' && height !== 'auto' && !/\d+(\.\d+)?%/.test(height)) {
			let group = height.split(divideIntoGroups)
			let value = parseFloat(group[1]);
			let unit = group[6]
			height = value * parseFloat(state.zoom) + unit;
		}
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
		let width = state.container.width;
		let height = state.container.height;
		// let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/gm;
		// if (width !== 'auto' && width !== 'auto' && !/\d+(\.\d+)?%/.test(width)) {
		// 	let group = width.split(divideIntoGroups)
		// 	let value = parseFloat(group[1]);
		// 	let unit = group[6]
		// 	width = value * parseFloat(state.zoom) + unit;
		// }
		// if (height !== 'auto' && height !== 'auto' && !/\d+(\.\d+)?%/.test(height)) {
		// 	let group = height.split(divideIntoGroups)
		// 	let value = parseFloat(group[1]);
		// 	let unit = group[6]
		// 	height = value * parseFloat(state.zoom) + unit;
		// }
		return {
			width: width,
			height: height
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