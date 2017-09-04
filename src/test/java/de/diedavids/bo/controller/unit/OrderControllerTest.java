package de.diedavids.bo.controller.unit;

import de.diedavids.bo.controller.OrderController;
import de.diedavids.bo.model.Order;
import de.diedavids.bo.repository.OrderRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.LinkedList;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class OrderControllerTest {

	@InjectMocks
	private OrderController sut;

	@Mock
	private OrderRepository orderRepository;


	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void listShouldReturnAllOrders() {
		List<Order> expectedOrders = new LinkedList<>();
		expectedOrders.add(new Order());

		when(orderRepository.findAll()).thenReturn(expectedOrders);

		List<Order> actualOrders = sut.list();

		// default JUnit assertions
		assertEquals(expectedOrders, actualOrders);
		assertEquals(1, actualOrders.size());

		// Hamcrest matchers
		assertThat(1, is(actualOrders.size()));

		// Mockito mock expectations
		verify(orderRepository).findAll();
	}

}
