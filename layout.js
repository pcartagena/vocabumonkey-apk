/* 
 * Copyright (C) 2014 cartagen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Shamelessly ripped from http://www.html5rocks.com/en/mobile/optimization-and-performance */

/* FIX -- Make sure you reparse the functions to match curent code. Its all based on the following DIV models -
 * 
 <div id="home-page" class="page">
  <h1>Home Page</h1>
</div>

<div id="products-page" class="page stage-right">
  <h1>Products Page</h1>
</div>

<div id="about-page" class="page stage-left">
  <h1>About Page</h1>
</div>
*
 */


function getElement(id) {
  return document.getElementById(id);
}

function slideTo(id) {
  //1.) the page we are bringing into focus dictates how
  // the current page will exit. So let's see what classes
  // our incoming page is using. We know it will have stage[right|left|etc...]
  var classes = getElement(id).className.split(' ');

  //2.) decide if the incoming page is assigned to right or left
  // (-1 if no match)
  var stageType = classes.indexOf('stage-left');

  //3.) on initial page load focusPage is null, so we need
  // to set the default page which we're currently seeing.
  if (FOCUS_PAGE == null) {
    // use home page
    FOCUS_PAGE = getElement('home-page');
  }

  //4.) decide how this focused page should exit.
  if (stageType > 0) {
    FOCUS_PAGE.className = 'scene transition stage-right';
  } else {
    FOCUS_PAGE.className = 'scene transition stage-left';
  }

  //5. refresh/set the global variable
  FOCUS_PAGE = getElement(id);

  //6. Bring in the new page.
  FOCUS_PAGE.className = 'scene transition stage-center';
}
