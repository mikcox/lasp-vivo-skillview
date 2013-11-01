'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//IMPORTANT: Remember when counting tables the title counts as one

describe('LEMR app navigation', function () {

    beforeEach(function () {
        browser().navigateTo('../../index.html#/');
    });
    it('should redirect index.html to index.html#/', function () {
        browser().navigateTo('../../index.html');
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

//describe('All skills filtering', function () {
//
//    beforeEach(function () {
//        browser().navigateTo('../../index.html#/');
//        //need to make my matcher here
//    });
//
//
//    it('should filter the personel list as user types into the search box', function () {
//        expect(repeater('tr').count()).toBe(20);
//
//        input('query').enter('Ty');
//        expect(repeater('tr').count()).toBe(2);
//
//        input('query').enter('Data');
//        expect(repeater('tr').count()).toBe(18);
//    });
//
//
//});
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
