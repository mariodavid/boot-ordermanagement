package de.diedavids.bo.repository;

import de.diedavids.bo.model.Order;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class OrderRepositoryStub {

    public static List<Order> list() {
        List<Order> orders = new LinkedList<Order>();

        Order order1 = new Order();
        order1.setCustomer("Klaus Customer");
        orders.add(order1);

        return orders;
    }
}
