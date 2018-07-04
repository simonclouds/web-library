'use strict';

const collections = require('./collections');
const deleting = require('./deleting');
const fetching = require('./fetching');
const items = require('./items');
const itemsByCollection = require('./items-by-collection');
const itemsByParent = require('./items-by-parent');
const itemsTop = require('./items-top');
const updating = require('./updating');
const itemCountByCollection = require('./item-count-by-collection');
const { get } = require('../../utils');
const actions = Object.entries(require('../../constants/actions'))
		.map(([key, value]) => ([
			'ERROR_CHILD_ITEMS',
			'ERROR_COLLECTIONS_IN_LIBRARY',
			'ERROR_CREATE_ITEM',
			'ERROR_DELETE_ITEM',
			'ERROR_DELETE_ITEMS',
			'ERROR_FETCH_ITEMS',
			'ERROR_ITEMS_IN_COLLECTION',
			'ERROR_TOP_ITEMS',
			'ERROR_UPDATE_ITEM',
			'PRE_UPDATE_ITEM',
			'RECEIVE_CHILD_ITEMS',
			'RECEIVE_COLLECTIONS_IN_LIBRARY',
			'RECEIVE_CREATE_ITEM',
			'RECEIVE_DELETE_ITEM',
			'RECEIVE_DELETE_ITEMS',
			'RECEIVE_FETCH_ITEMS',
			'RECEIVE_ITEMS_IN_COLLECTION',
			'RECEIVE_TOP_ITEMS',
			'RECEIVE_UPDATE_ITEM',
			'REQUEST_CHILD_ITEMS',
			'REQUEST_COLLECTIONS_IN_LIBRARY',
			'REQUEST_CREATE_ITEM',
			'REQUEST_DELETE_ITEM',
			'REQUEST_DELETE_ITEMS',
			'REQUEST_FETCH_ITEMS',
			'REQUEST_ITEMS_IN_COLLECTION',
			'REQUEST_TOP_ITEMS',
			'REQUEST_UPDATE_ITEM',
			'TRIGGER_EDITING_ITEM',
	]).includes(key) ? value : false).filter(Boolean);

const libraries = (state = {}, action) => {
	if(actions.includes(action.type)) {
		return {
			...state,
			[action.libraryKey]: {
				collections: collections(get(state, [action.libraryKey, 'collections']), action),
				deleting: deleting(get(state, [action.libraryKey, 'deleting']), action),
				fetching: fetching(get(state, [action.libraryKey, 'fetching']), action),
				itemCountByCollection: itemCountByCollection(get(state, [action.libraryKey, 'itemCountByCollection']), action),
				items: items(get(state, [action.libraryKey, 'items']), action),
				itemsByCollection: itemsByCollection(get(state, [action.libraryKey, 'itemsByCollection']), action),
				itemsByParent: itemsByParent(get(state, [action.libraryKey, 'itemsByParent']), action),
				itemsTop: itemsTop(get(state, [action.libraryKey, 'itemsTop']), action),
				updating: updating(get(state, [action.libraryKey, 'updating']), action),
			}
		}
	} else { return state; }
}

module.exports = libraries;