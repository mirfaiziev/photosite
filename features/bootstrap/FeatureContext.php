<?php

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends \Behat\MinkExtension\Context\MinkContext
{
    /**
     * @Then /^I click on "([^"]*)"$/
     */
    public function iClickOn($arg1)
    {
        $page = $this->getSession()->getPage();

        $findName = $page->find("css", $arg1);
        if (!$findName){
            throw new Exception($arg1." could not be found");
        }
        else {
            $findName->click();
        }

    }

    /**
     * @When /^(?:|I )should see "([^"]*)" in popup$/
     *
     * @param string $message The message.
     *
     * @return bool
     */
    public function assertPopupMessage($message)
    {
        return $message == $this->getSession()->getDriver()->getWebDriverSession()->getAlert_text();
    }
}
