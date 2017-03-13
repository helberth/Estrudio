import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ItemComponent from '../components/Item-component';
import FontAwesome from 'react-fontawesome';

export default class ListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        //props
        const { categories, isLoading } = this.props;

        //handlers
        const { selectItem } = this.props;

        //form parent
        const { title } = this.props;

        return (
            <div>
                {isLoading &&
                    <div className='text-center'>
                        <FontAwesome
                            className='center-block'
                            name='spinner'
                            size='2x'
                            spin
                        />
                    </div>
                }
                {!isLoading &&
                    <ListGroup>
                        {
                            categories.map(item => {
                                if (item) {
                                    return <ItemComponent key={item.getID()}
                                        title={item.getLabel()}
                                        id={item.getID()}
                                        selectItem={selectItem}
                                        childrenNumber={item.getSize()}
                                    />
                                }
                            })
                        }
                        {title && (categories.size == 0) &&
                            <p>No hay {title}</p>
                        }
                    </ListGroup>
                }
            </div>
        );
    }
};