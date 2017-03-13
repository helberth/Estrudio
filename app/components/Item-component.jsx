import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';
import { Link } from 'react-router';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Badge from 'react-bootstrap/lib/Badge';

export default class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        //props
        const { id, title, childrenNumber } = this.props;

        //hanlders
        const { selectItem } = this.props;

        return (
            <ListGroupItem href="#"
                onClick={() => selectItem(id)} >
                {title}
                <Badge>{childrenNumber}</Badge>
            </ListGroupItem>
        )
    }
};

ItemComponent.propTypes = {
    title: PropTypes.string.isRequired,
    selectItem: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    childrenNumber: PropTypes.number.isRequired
};