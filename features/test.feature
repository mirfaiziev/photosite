Feature: Test
  Scenario: First
    Given I am on the homepage
    Then I should see "Katheryna Sokhan Photography"

  @javascript
  Scenario: Second
    Given I am on the homepage
    When I click on "#clickme"
    Then I should see "clicked" in popup