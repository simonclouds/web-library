'use strict';

const React = require('react');
const { connect } = require('react-redux');
const hoistNonReactStatic = require('hoist-non-react-statics');
const { triggerEditingItem } = require('../actions');
const { getCurrent } = require('../common/state.js');

var withEditMode = Component => {
	class EnhancedComponent extends React.PureComponent {
		onEditModeToggle(isEditing) {
			this.props.dispatch(
				triggerEditingItem(this.props.itemKey, isEditing)
			);
		}

		render() {
			return <Component
				onEditModeToggle={ this.onEditModeToggle.bind(this) }
				{...this.props }
			/>;
		}

		static displayName = `withEditMode(${Component.displayName || Component.name})`
		static WrappedComponent = Component;
	}

	return connect(mapStateToProps)(hoistNonReactStatic(EnhancedComponent, Component));
}

const mapStateToProps = state => {
	const { itemKey, editingItemKey } = getCurrent(state);

	return { itemKey, isEditing: itemKey ? editingItemKey === itemKey : false };
}

module.exports = withEditMode;
