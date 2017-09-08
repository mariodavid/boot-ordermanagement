class OrderRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.order.customer}</td>
                <td>{this.props.order.totalAmount}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-xs btn-primary"
                                onClick={() => this.props.editOrder(this.props.order)}><span
                            className="glyphicon glyphicon-edit"/></button>
                        <button className="btn btn-xs btn-danger"
                                onClick={() => this.props.deleteOrder(this.props.order)}><span
                            className="glyphicon glyphicon-remove"/></button>
                    </div>
                </td>
            </tr>);

    }
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: {
                customer: "",
                id: "",
                totalAmount: "",
            },
            orders: []
        };

        this.loadOrdersFromServer = this.loadOrdersFromServer.bind(this)
        this.handleCustomerEdit = this.handleCustomerEdit.bind(this)
        this.handleTotalAmountEdit = this.handleTotalAmountEdit.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.editOrder = this.editOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.saveOrder = this.saveOrder.bind(this)
    }


    componentDidMount() {
        this.loadOrdersFromServer();
        $(".order-detail").hide()
    }

    loadOrdersFromServer() {
        var self = this;
        $.ajax({
            url: "http://localhost:8181/orders"
        }).then(function (data) {
            self.setState({orders: data});
        });
    }


    deleteOrder(order){

        var self = this;

        $.ajax({
            url: "http://localhost:8181/orders/" + order.id,
            type: 'DELETE',
            success: function (result) {
                toastr.info('Order deleted sucessfully...')
                self.loadOrdersFromServer();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    }

    editOrder(order){
        $(".order-detail").fadeIn()
        this.setState({selectedOrder: order})
    }

    createOrder(){
        $(".order-detail").fadeIn()
        this.setState({selectedOrder: {
            id: null,
            customer: "",
            totalAmount: "",
        }})
    }

    saveOrder(event) {

        $(".order-detail").fadeOut()
        event.preventDefault()

        const order = this.state.selectedOrder

        var url = "http://localhost:8181/orders/";
        var type = "POST"
        if (order.id !== null) {
            url = url + order.id;
            type = "PUT"
        }

        var self = this;
        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(order),
            success: function (result) {
                toastr.info('Order edited sucessfully...')
                self.loadOrdersFromServer();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
                console.error(xhr.responseJSON.message)
            }
        });
    }

    handleCustomerEdit(event) {
        const changedValue = event.target.value;
        this.setState((prevState) => {
            return { selectedOrder: {id: prevState.selectedOrder.id, totalAmount: prevState.selectedOrder.totalAmount, customer: changedValue}}
        })
    }
    handleTotalAmountEdit(event) {
        const changedValue = event.target.value;
        this.setState((prevState) => {
            return { selectedOrder: {id: prevState.selectedOrder.id, totalAmount: changedValue, customer: prevState.selectedOrder.customer}}
        })
    }

    render() {

        return (
            <div>
                <div className="pull-right">
                    <button className="btn btn-default" onClick={this.loadOrdersFromServer}>
                        <span className="glyphicon glyphicon-refresh" />
                    </button>
                    <button className="btn btn-primary" onClick={this.createOrder}>
                        <span className="glyphicon glyphicon-plus" />
                    </button>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.sort((a,b) => a.id - b.id).map((order,index) => {

                        return <OrderRow
                            deleteOrder={this.deleteOrder}
                            editOrder= {this.editOrder}
                            order = {order}
                            key={index}
                        />
                    })}
                    </tbody>
                </table>

                <div className="order-detail">
                    <hr/>
                    <h2>Order details: {this.state.selectedOrder.customer}</h2>
                    <form className="order-form" onSubmit={this.saveOrder}>
                        <div className="form-group">
                            <label htmlFor="customer">Customer</label>
                            <input
                                className="form-control"
                                name="customer"
                                type="text"
                                required
                                onChange={this.handleCustomerEdit}
                                placeholder="Cutomer..."
                                value={this.state.selectedOrder.customer}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="totalAmount">Total Amount</label>
                            <input
                                className="form-control"
                                name="totalAmount"
                                type="text"
                                required
                                placeholder="Total amount..."
                                onChange={this.handleTotalAmountEdit}
                                value={this.state.selectedOrder.totalAmount}
                            />
                        </div>

                        <button type="submit" className="btn btn-default">Save</button>
                    </form>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));