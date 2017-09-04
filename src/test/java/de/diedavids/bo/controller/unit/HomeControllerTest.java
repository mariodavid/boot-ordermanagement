package de.diedavids.bo.controller.unit;

import de.diedavids.bo.controller.HomeController;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class HomeControllerTest {

	@Test
	public void homeController() {
		HomeController sut = new HomeController();
		assertEquals(sut.home(), "boot-ordermanagement");
	}

}
