backbone-jasmine
================

More for my own sanity than anything else, I'll be building up a simple interface, that will query an API
and display the results in a view. The process will involve writing a test in Jasmine and then writing some
code to make it pass.

The idea is that there will be a:

* Search View
* Search Model
* A List View
* A List collection
* A Result/List Item that will form part of the List Collection
* Some routes to bind the two views together

Set-up
======

To get started everything is in the setup branch. I have also included a simple node https server to serve
up the the SpecRunner file (running on http://localhost:3000), a few helper libraries (jasmine-jquery and jasmine-sinon) with additional matchers.

Search form
===========

Basically I intend to hit the blizzard API to retrieve the feed of a given character on a given realm. To start
off let's create a search view and get started with a really basic test to load a fixture and make sure it's been
been loaded.