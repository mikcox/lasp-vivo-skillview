'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//IMPORTANT: Remember when counting tables the title counts as one

describe('LEMR app navigation', function () {

    beforeEach(function () {
        browser().navigateTo('../../index.php#/');
    });
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
    /*
    it('can't click on nonexistent elements', function () {
    	var clickOnNonexistentElement = function(){
    		element('#fakeElement').click();
    	};
        expect(clickOnNonexistentElement).toThrow();
    });
*/
});

describe('All skills filtering', function () {

    beforeEach(function () {
        browser().navigateTo('../../index.php#/');
    });


    it('should build a list of at least 10 rows', function () {
    	var totalRows;
    	var tableRows;
    	/*
    	input('query').enter('');
    	totalRowFuture.execute(function(){
    	});
    	var totalRows = totalRowFuture.value;
        alert(totalRows);
        expect(totalRows.value).toBeGreaterThan(10);
       // expect(repeater('td').count()).toEqual(totalRows);
        */
        input('query').enter('');
    	tableRows = repeater('tr').count();
        expect(tableRows).toBeGreaterThan(10);

    });
    
    /*
    it('should filter the personel list as user types into the search box', function () {
    	var totalRows;
    	var tableRows;
    	
    	input('query').enter('');
    	totalRows = repeater('tr').count();
    	alert(totalRows);
        expect(totalRows).toBeGreaterThan(10);
        
        input('query').enter('data');
    	tableRows = repeater('tr').count();
        expect(tableRows).toBeGreaterThan(10);

    });
     */


});
//
//
//    describe('Add Skill view', function () {
//
//        beforeEach(function () {
//            browser().navigateTo('../../index.html#/mapaskill');
//        });
//
//        it('should filter the personel list as user types into the search box', function () {
//            expect(repeater('#table1 li').count()).toBe(549);
//
//            input('name.person').enter('Ty');
//            expect(repeater('#table1 li').count()).toBe(9);
//
//            input('name.person').enter('Cox');
//            expect(repeater('#table1 li').count()).toBe(1);
//        });
//
//        it('should filter the skill list as user types into the search box', function () {
//            expect(repeater('#table2 li').count()).toBe(35);
//
//            input('skillname.skill').enter('UNIX');
//            expect(repeater('#table2 li').count()).toBe(5);
//
//            input('skillname.skill').enter('intermediate');
//            expect(repeater('#table2 li').count()).toBe(7);
//        });
//
//    });
//});
