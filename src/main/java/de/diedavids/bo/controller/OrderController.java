package de.diedavids.bo.controller;

import de.diedavids.bo.model.Order;
import de.diedavids.bo.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/")
public class OrderController {


    @Autowired
    OrderRepository orderRepository;

    @RequestMapping(value = "orders", method = RequestMethod.GET)
    public Collection<Order> list() {
        return orderRepository.findAll();
    }

    @RequestMapping(value = "orders", method = RequestMethod.POST)
    public Order create(@RequestBody Order order) {
        return orderRepository.put(order);
    }

    @RequestMapping(value = "orders/{id}", method = RequestMethod.GET)
    public Order get(@PathVariable String id) {
        return orderRepository.get(id);
    }

    @RequestMapping(value = "orders/{id}", method = RequestMethod.PUT)
    public Order update(@PathVariable String id, @RequestBody Order order) {
        Order existingOrder = orderRepository.get(id);
        BeanUtils.copyProperties(order, existingOrder);
        return orderRepository.put(existingOrder);
    }


    @RequestMapping(value = "orders/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        orderRepository.delete(id);
    }


}
