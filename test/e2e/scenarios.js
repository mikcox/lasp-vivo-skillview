'use strict';
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//IMPORTANT: Remember when counting tables the title counts as one
describe('All Skills view', function () {
  it('navigate to all skills view', function () {
    browser().navigateTo('../../index.php#/');
    expect(browser().location().url()).toBe('/');
  });
  it('should build a list of at least 10 rows and exactly 8 columns with an empty search query', function () {
    input('query').enter('');
    expect(repeater('tr').count()).toBeGreaterThan(10);
    expect(repeater('th').count()).toBe(8);
  });
  it('builds some results when a search input is entered', function () {
    /* Note that the actual specific results of the search function are being tested with unit tests, so we only verify here that
   		*  the search box is indeed doing something.
   		*/
    input('query').enter('Michael');
    expect(repeater('tr').count()).toBeGreaterThan(1);
    expect(repeater('th').count()).toBe(8);
    input('query').enter('ty trav');
    expect(repeater('tr').count()).toBeGreaterThan(1);
    expect(repeater('th').count()).toBe(8);
    input('query').enter('SEAR%%ch stR1ng th@t doesn"t exi$t');
    expect(repeater('tr').count()).toBe(1);
    expect(repeater('th').count()).toBe(8);
  });
});
describe('Map A Skill view', function () {
  it('navigate to #/mapaskill', function () {
    element('#mapASkill').click();
    expect(browser().location().url()).toBe('/mapaskill');
  });
  it('should filter the personel list as user types into the search box', function () {
    input('personquery').enter('');
    expect(repeater('#table1 div').count()).toBe(0);
    input('personquery').enter('Ty');
    expect(repeater('#table1 div').count()).toBe(9);
    input('personquery').enter('Cox');
    expect(repeater('#table1 div').count()).toBe(1);
  });
  it('should filter the skill list as user types into the search box', function () {
    input('skillquery').enter('');
    expect(repeater('#table2 div').count()).toBe(0);
    input('skillquery').enter('UNIX');
    expect(repeater('#table2 div').count()).toBe(1);
    input('skillquery').enter('intermediate');
    expect(repeater('#table2 div').count()).toBe(0);
  });
  it('should give us an "Add this skill" button if no results are returned', function () {
    //don't display the div if there's a result found...
    input('skillquery').enter('Java');
    expect(repeater('#addSkillButtonDiv:visible').count()).toBe(0);
    //display the div if we didn't find a result
    input('skillquery').enter('fakeNonexistentSkill');
    expect(repeater('#addSkillButtonDiv:visible').count()).toBe(1);
  });
  it('clicking on "add this skill" button should add the item to the list', function () {
    //make sure this skill doesn't yet exist
    input('skillquery').enter('fakeNonexistentSkill');
    expect(repeater('#table2 div').count()).toBe(0);
    //click on the 'add this skill' button
    element('#addNewSkillButton').click();
    //double-check that it got added locally
    expect(repeater('#table2 div').count()).toBe(1);
  });
});
describe('LEMR app navigation', function () {
  // Navigating to /index.php before every single function is what was slowing the tests down so much... so let's not do it.
  //beforeEach(function () {
  //    browser().navigateTo('../../index.php#/');
  //});
  it('should redirect index.html to index.php#/', function () {
    browser().navigateTo('../../index.php');
    expect(browser().location().url()).toBe('/');
  });
  it('Logo click redirect us to the home page', function () {
    element('#logo').click();
    expect(browser().location().url()).toBe('/');
  });
  it('View all skills click should redirect to root page', function () {
    element('#viewAllSkills').click();
    expect(browser().location().url()).toBe('/');
  });
  it('Add a skill click should redirect us to #/mapaskill page', function () {
    element('#mapASkill').click();
    expect(browser().location().url()).toBe('/mapaskill');
  });
});