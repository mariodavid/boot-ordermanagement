package de.diedavids.bo.controller;

import de.diedavids.bo.model.Order;
import de.diedavids.bo.repository.OrderRepositoryStub;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrderController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Order> list() {
        return OrderRepositoryStub.list();
    }

}
