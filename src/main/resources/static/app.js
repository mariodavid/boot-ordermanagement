class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {display: true};

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        var self = this;
        $.ajax({
            url: "http://localhost:8181/orders/" + self.props.order.id,
            type: 'DELETE',
            success: function (result) {
                self.setState({display: false});
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    }

    handleEdit(event) {
        this.props.selectOrder(this.props.order)
        // var self = this;
        // var data = {
        //     id: self.props.order.id,
        //     customer: "Hansi",
        //     totalAmount: 16767
        // };
        // $.ajax({
        //     url: "http://localhost:8181/orders/" + self.props.order.id,
        //     type: 'PUT',
        //     contentType: "application/json",
        //     data: JSON.stringify(data),
        //     success: function (result) {
        //         self.setState({display: true});
        //     },
        //     error: function (xhr, ajaxOptions, thrownError) {
        //         toastr.error(xhr.responseJSON.message);
        //     }
        // });
    }

    render() {
        if (this.state.display == false) return null;
        else return (
            <tr>
                <td>{this.props.order.customer}</td>
                <td>{this.props.order.totalAmount}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-xs btn-primary" onClick={this.handleEdit}><span
                            className="glyphicon glyphicon-edit"/></button>
                        <button className="btn btn-xs btn-danger" onClick={this.handleDelete}><span
                            className="glyphicon glyphicon-remove"/></button>
                    </div>
                </td>
            </tr>);

    }
}

class OrderForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {order: props.order};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var partialState = this.state;
        partialState.order[name] = value;
        this.setState(partialState);
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.order);
        this.setState({order: event.target.value});
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <h2>Order details: {this.state.order.customer}</h2>
                <form className="order-form">
                    <div className="form-group">
                        <label htmlFor="customer">Customer</label>
                        <input
                            onChange={this.handleChange}
                            className="form-control"
                            name="customer"
                            type="text"
                            placeholder="Cutomer (required)..."
                            value={this.state.order.customer}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalAmount">Total Amount</label>
                        <input
                            onChange={this.handleChange}
                            className="form-control"
                            name="totalAmount"
                            type="text"
                            placeholder="Total amount..."
                            value={this.state.order.totalAmount}
                        />
                    </div>

                    <button type="submit" className="btn btn-default">Save</button>
                </form>
            </div>
        );
    }

}


var OrderTable = React.createClass({
    render: function () {
        var rows = [];
        var self = this;
        this.props.orders.forEach(function (order, i) {
            rows.push(<Order key={i} order={order} selectOrder={self.props.selectOrder}/>);
        });
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: {},
            orders: []
        };

        this.selectOrder = this.selectOrder.bind(this)
    }


    loadOrdersFromServer() {
        var self = this;
        $.ajax({
            url: "http://localhost:8181/orders"
        }).then(function (data) {
            self.setState({orders: data});
        });
    }

    componentDidMount() {
        this.loadOrdersFromServer();
    }

    selectOrder (selectedOrder) {
        this.setState({
            selectedOrder: selectedOrder
        })
    }

    render() {

        return (
            <div>
                <OrderTable orders={this.state.orders} selectOrder={this.selectOrder}/>
                <hr/>
                <OrderForm order={this.state.selectedOrder} />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));