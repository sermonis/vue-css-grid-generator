const getters = {
	gridStyle: state => (grid) => {
		let height = state[grid].height;
		let width = state[grid].width;
		let gridTemplateColumns = state[grid].templateColumns;
		let gridTemplateRows = state[grid].templateRows;
		let gridRowGap = state[grid].rowsGap;
		let gridColumnGap = state[grid].columnsGap;

		function applyZoom(value) {
			let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|fr|vw|vh|in|cm|mm|pt|pc)$/gm;
			if ( value !== 'auto' && value !== 'auto' && !/\d+(\.\d+)?%/.test(value)) {
				let group = value.split(divideIntoGroups)
				let num = parseFloat(group[1]);
				let unit = group[6]
				if (unit && unit !== 'fr') value = num * parseFloat(state.zoom) + unit;
			}
			return value
		}

		// If height or/and width of grid root element has % unit it should be seted to 100%
		// Because real % value is already seted to root grid container.
		if(grid === 'root') {
			if (/\d+(\.\d+)?%/.test(height)) height = '100%';
			if (/\d+(\.\d+)?%/.test(width)) width = '100%';
		}

		// Apply Zoom
		height = applyZoom(height);
		width = applyZoom(width);
		gridColumnGap = applyZoom(gridColumnGap);
		gridRowGap = applyZoom(gridRowGap);
		gridTemplateColumns = gridTemplateColumns.map(function(value) {
			return applyZoom(value);
		})
		gridTemplateRows = gridTemplateRows.map(function(value) {
			return applyZoom(value);
		});

		return {
			height: height,
			width: width,
			gridColumnGap: gridColumnGap,
			gridRowGap: gridRowGap,
			gridTemplateColumns: gridTemplateColumns.join(' '),
			gridTemplateRows: gridTemplateRows.join(' '),
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
		let parentGrid = state[grid].parentGrid[0];
		let parentIndex = state[grid].parentIndex;
		let justifyContent = state[parentGrid].items[parentIndex].justifySelf;
		let alignItems = state[parentGrid].items[parentIndex].alignSelf;
		return {
			width: width,
			height: height,
			justifyContent: justifyContent,
			alignItems: alignItems
		}}
	},
	cellStyles: (state, getters) => (grid) => {
		let styles = [];
		state[grid].items.map((item) => {
			if (item.subGrid !== 'none') {
				styles.push({
					gridColumn: item.fromCol + '/' + (!isNaN(parseInt(item.toCol)) ? parseInt(item.toCol) + 1 : item.toCol),
					gridRow: item.fromRow + '/' + (!isNaN(parseInt(item.toRow)) ? parseInt(item.toRow) + 1 : item.toRow),
					justifySelf: item.justifySelf,
					alignSelf: item.alignSelf,
					... getters.gridStyle(item.subGrid),
					display: 'inline-grid',
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
			if (item.subGrid !== 'none') {
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