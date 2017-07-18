tablerow-labelr
===========

Browser-based labelling of table rows built from JSON data.

The data must be located in the [dist/input.json](dist/input.json) folder.

  1. [Usage](#usage)
  2. [Building](#building)
  3. [Changelog](#changelog)
  4. [License](#license)


Usage
-----
Install the package:

    npm install tablerow-labelr


Building
--------
To build the HTML table from the JSON source:

    git clone https://github.com/Stezii/tablerow-labelr.git && cd tablerow-labelr
    make build

You will find an updated HTML file in [`dist/output.html`](dist/output.html).

Open it in your browser and label each row element. Click the save button to store the table as JSON again.

![demo](img/demo.gif?raw=true "demo")


Changelog
---------
#### v0.1.0
- Initial version.


License
-------
Copyright &copy; 2017 [Stefan Zimmer](https://github.com/Stezii)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
