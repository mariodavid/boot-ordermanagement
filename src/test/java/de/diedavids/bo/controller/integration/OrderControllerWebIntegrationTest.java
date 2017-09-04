package de.diedavids.bo.controller.integration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OrderControllerWebIntegrationTest {

	@Autowired
	TestRestTemplate testRestTemplate;

	@Test
	public void listReturnsHttp200() {

		ResponseEntity<String> response = testRestTemplate.getForEntity("/orders/1", String.class);

		assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

	}

}
