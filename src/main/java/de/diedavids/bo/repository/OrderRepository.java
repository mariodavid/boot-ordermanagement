package de.diedavids.bo.repository;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import de.diedavids.bo.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class OrderRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Order put(Order item) {
        dynamoDBMapper.save(item);
        return item;
    }

    public Order get(String id) {
        return dynamoDBMapper.load(Order.class, id);
    }

    public void delete(String id) {
        Order item = new Order();
        item.setId(id);

        dynamoDBMapper.delete(item);
    }

    public Collection<Order> findAll() {
        return dynamoDBMapper.scan(Order.class, new DynamoDBScanExpression());
    }
}
