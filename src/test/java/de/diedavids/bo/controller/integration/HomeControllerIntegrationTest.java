package de.diedavids.bo.controller.integration;

import de.diedavids.bo.controller.HomeController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HomeControllerIntegrationTest {

	@Test
	public void homeController() {
		HomeController sut = new HomeController();
		assertEquals(sut.home(), "boot-ordermanagement");
	}

}
