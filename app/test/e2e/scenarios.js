'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//IMPORTANT: Remember when counting tables the title counts as one

describe('LEMR App', function() {

  it('should redirect index.html to index.html#/', function() {
    browser().navigateTo('../../index.html');
    expect(browser().location().url()).toBe('/');
  });
  
  describe('Skills List View', function() {

    beforeEach(function() {
      browser().navigateTo('../../index.html#/');
    });


    it('should filter the personel list as user types into the search box', function() {
      expect(repeater('tr').count()).toBe(20);

      input('query').enter('Ty');
      expect(repeater('tr').count()).toBe(2);

      input('query').enter('Data');
      expect(repeater('tr').count()).toBe(18);
    });


  });


  describe('Add Skill view', function() {

    beforeEach(function() {
      browser().navigateTo('../../index.html#/mapaskill');
    });

    it('should filter the personel list as user types into the search box', function() {
      expect(repeater('#table1 tr').count()).toBe(550);

      input('name.person').enter('Ty');
      expect(repeater('#table1 tr').count()).toBe(10);

      input('name.person').enter('Cox');
      expect(repeater('#table1 tr').count()).toBe(2);
    });
    
    it('should filter the skill list as user types into the search box', function() {
      expect(repeater('#table2 tr').count()).toBe(36);

      input('skill.skill').enter('UNIX');
      expect(repeater('#table2 tr').count()).toBe(6);

      input('skill.skill').enter('intermediate');
      expect(repeater('#table2 tr').count()).toBe(8);
    });

  });
});