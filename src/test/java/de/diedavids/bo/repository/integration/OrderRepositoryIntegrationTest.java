package de.diedavids.bo.repository.integration;

import de.diedavids.bo.model.Order;
import de.diedavids.bo.repository.OrderRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.is;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderRepositoryIntegrationTest {

	@Autowired
	private OrderRepository orderRepository;


	@Before
	public void init() {
	}

	@Test
	public void listShouldReturnAllOrders() {

		Collection<Order> actualOrders = orderRepository.findAll();
		assertThat(actualOrders.size(),is(greaterThanOrEqualTo(1)));
	}

}
