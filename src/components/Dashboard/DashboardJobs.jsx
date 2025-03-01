import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
];

const DMAS = [
    "PORTLAND-AUBURN", "NEW YORK", "BINGHAMTON", "MACON", "PHILADELPHIA", "DETROIT", "BOSTON", "SAVANNAH", "PITTSBURGH", "FORT WAYNE", "CLEVELAND-AKRON", "WASHINGTON, DC-HAGRSTWN", "BALTIMORE", "FLINT-SAGINAW-BAY CITY", "BUFFALO", "CINCINNATI", "ERIE", "CHARLOTTE", "GREENSBORO-HIGH POINT-WINSTON SALEM", "CHARLESTON, SC", "AUGUSTA", "PROVIDENCE-NEW BEDFORD", "COLUMBUS, GA", "PEORIA-BLOOMINGTON", "BURLINGTON-PLATTSBURGH", "ATLANTA", "ALBANY, GA", "UTICA", "INDIANAPOLIS", "MIAMI-FORT LAUDERDALE", "LOUISVILLE", "TALLAHASSEE-THOMASVILLE", "TRI-CITIES, TN-VA", "ALBANY-SCHENECTADY-TROY", "HARTFORD-NEW HAVEN", "ORLANDO-DAYTONA BEACH-MELBOURNE", "COLUMBUS, OH", "YOUNGSTOWN", "BANGOR", "ROCHESTER, NY", "TAMPA-ST PETERSBURG-SARASOTA", "TRAVERSE CITY-CADILLAC", "LEXINGTON", "DAYTON", "SPRINGFIELD-HOLYOKE", "NORFOLK-PORTSMOUTH-NEWPORT NEWS", "GREENVILLE-NEW BERN-WASHINGTON", "COLUMBIA, SC", "TOLEDO", "WHEELING-STEUBENVILLE", "WEST PALM BEACH-FT PIERCE", "WATERTOWN", "WILMINGTON", "LANSING", "PRESQUE ISLE", "MARQUETTE", "SYRACUSE", "DULUTH-SUPERIOR", "RICHMOND-PETERSBURG", "KNOXVILLE", "LIMA", "BLUEFIELD-BECKLEY-OAK HILL", "RALEIGH-DURHAM", "JACKSONVILLE", "GRAND RAPIDS-KALAMAZOO-BATTLE CREEK", "AUSTIN", "CHARLESTON-HUNTINGTON", "ELMIRA", "HARRISBURG-LANCASTER-LEBANON-YORK", "GREENVILLE-SPARTANBURG-ASHEVILLE", "HARRISONBURG", "MYRTLE BEACH-FLORENCE", "HARLINGEN-WESLACO-BROWNSVILLE", "FORT MYERS-NAPLES", "ROANOKE-LYNCHBURG", "JOHNSTOWN-ALTOONA", "CHATTANOOGA", "SALISBURY", "WILKES BARRE-SCRANTON", "HATTIESBURG-LAUREL", "TERRE HAUTE", "LAFAYETTE, IN", "ALPENA", "CHARLOTTESVILLE", "SOUTH BEND-ELKHART", "GAINESVILLE", "ZANESVILLE", "PARKERSBURG", "CLARKSBURG-WESTON", "CORPUS CHRISTI", "CHICAGO", "JOPLIN-PITTSBURG", "COLUMBIA-JEFFERSON CITY", "TOPEKA", "DOTHAN", "SAINT LOUIS", "ROCKFORD", "ROCHESTER-MASON CITY-AUSTIN", "SHREVEPORT", "MINNEAPOLIS-SAINT PAUL", "KANSAS CITY", "MILWAUKEE", "GREEN BAY-APPLETON", "HOUSTON", "SPRINGFIELD, MO", "NEW ORLEANS", "DALLAS-FORT WORTH", "SIOUX CITY", "WACO-TEMPLE-BRYAN", "VICTORIA", "WICHITA FALLS-LAWTON", "MONROE-EL DORADO", "BIRMINGHAM", "OTTUMWA-KIRKSVILLE", "PADUCAH-CAPE GIRARDEAU-HARRISBURG", "ODESSA-MIDLAND", "AMARILLO", "CEDAR RAPIDS-WATERLOO-DUBUQUE", "SAINT JOSEPH", "JACKSON, TN", "MEMPHIS", "SAN ANTONIO", "LAFAYETTE, LA", "LAKE CHARLES", "ALEXANDRIA, LA", "GREENWOOD-GREENVILLE", "CHAMPAIGN-SPRINGFIELD-DECATUR", "EVANSVILLE", "OKLAHOMA CITY", "LUBBOCK", "OMAHA", "PANAMA CITY", "SHERMAN-ADA", "NASHVILLE", "SAN ANGELO", "ABILENE-SWEETWATER", "MADISON", "FORT SMITH-FAY-SPRNGDL", "TULSA", "COLUMBUS-TUPELO-WEST POINT", "WICHITA-HUTCHINSON PLUS", "DES MOINES-AMES", "DAVENPORT-ROCK ISLAND-MOLINE", "MOBILE-PENSACOLA", "MINOT-BISMARCK-DICKINSON", "HUNTSVILLE-DECATUR-FLORENCE", "BEAUMONT-PORT ARTHUR", "LITTLE ROCK-PINE BLUFF", "MONTGOMERY", "LA CROSSE-EAU CLAIRE", "WAUSAU-RHINELANDER", "TYLER-LONGVIEW (LFKN&NCGD)", "MERIDIAN", "BATON ROUGE", "QUINCY-HANNIBAL-KEOKUK", "JACKSON, MS", "LINCOLN-HASTINGS-KEARNEY PLUS", "FARGO-VALLEY CITY", "EL PASO", "SIOUX FALLS (MITCHELL)", "JONESBORO", "BOWLING GREEN", "MANKATO", "NORTH PLATTE", "ANCHORAGE", "HONOLULU", "FAIRBANKS", "BILOXI-GULFPORT", "JUNEAU", "LAREDO", "HELENA", "CASPER-RIVERTON", "DENVER", "COLORADO SPRINGS-PUEBLO", "PHOENIX", "BUTTE-BOZEMAN", "GREAT FALLS", "BEND, OR", "SAN DIEGO", "BILLINGS", "BOISE", "IDAHO FALLS-POCATELLO", "CHEYENNE-SCOTTSBLUFF", "TWIN FALLS", "MISSOULA", "RAPID CITY", "SALT LAKE CITY", "YUMA-EL CENTRO", "GRAND JUNCTION-MONTROSE", "TUCSON-SIERRA VISTA", "ALBUQUERQUE-SANTA FE", "GLENDIVE", "BAKERSFIELD", "EUGENE", "EUREKA", "LOS ANGELES", "SAN FRANCISCO-OAKLAND-SAN JOSE", "YAKIMA-PASCO-RCHLND-KNNWCK", "RENO", "MEDFORD-KLAMATH FALLS", "SEATTLE-TACOMA", "PORTLAND, OR", "MONTEREY-SALINAS", "LAS VEGAS", "SANTA BARBARA-SAN MAR-SAN LUIS OBISPO", "SACRAMENTO-STOCKTON-MODESTO", "FRESNO-VISALIA", "CHICO-REDDING", "SPOKANE"
];

const DashboardJobs = () => {
    const [textValue, setTextValue] = useState("");
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedDmas, setSelectedDmas] = useState([]);
    const [selectAllStates, setSelectAllStates] = useState(false);
    const [selectAllDmas, setSelectAllDmas] = useState(false);

    const animatedComponents = makeAnimated();

    // Format options for react-select
    const stateOptions = STATES.map(state => ({ value: state, label: state }));
    const dmaOptions = DMAS.map(dma => ({ value: dma, label: dma }));

    const handleSelectAllStates = (e) => {
        setSelectAllStates(e.target.checked);
        setSelectedStates(e.target.checked ? stateOptions : []);
    };

    const handleSelectAllDmas = (e) => {
        setSelectAllDmas(e.target.checked);
        setSelectedDmas(e.target.checked ? dmaOptions : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('geomap_auth');

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/submit-job`, {
            method: 'POST',
            body: {
                jobs: []
            },
            headers: {
                authorization: `Bearer token`
            }
        })

        console.log("SUBMIT JOB DATA: ", {
            textValue,
            selectedStates,
            selectedDmas
        })
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="mb-4 text-center text-2xl">Submit Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="textInput" className="form-label block required">
                        Enter Text <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control border w-full p-2 my-2"
                        id="textInput"
                        placeholder="Enter your text here"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        required
                    />
                </div>

                <div className="row grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">States</label>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="cursor-pointer me-1"
                                checked={selectAllStates}
                                id="selectAllStates"
                                onChange={handleSelectAllStates}
                            />
                            <label htmlFor="selectAllStates" className="cursor-pointer form-check-label">Select All States</label>
                        </div>
                        <Select
                            isMulti
                            components={{
                                DropdownIndicator: () => null, // Removes the down arrow
                                ClearIndicator: () => null // Removes the cross button
                            }}
                            options={stateOptions}
                            value={selectedStates}
                            onChange={setSelectedStates}
                            placeholder="Select States..."
                            closeMenuOnSelect={false}
                        />

                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">DMAs</label>
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="cursor-pointer me-1"
                                id="selectAllDmas"
                                checked={selectAllDmas}
                                onChange={handleSelectAllDmas}
                            />
                            <label htmlFor="selectAllDmas" className="form-check-label cursor-pointer">Select All DMAs</label>
                        </div>
                        <Select
                            isMulti
                            components={{
                                DropdownIndicator: () => null, // Removes the down arrow
                                ClearIndicator: () => null // Removes the cross button
                            }}
                            options={dmaOptions}
                            value={selectedDmas}
                            onChange={setSelectedDmas}
                            placeholder="Select DMAs..."
                            closeMenuOnSelect={false}
                        />
                    </div>
                </div>

                <button className="w-full py-2 bg-blue-500 text-white cursor-pointer">Submit</button>
            </form>
        </div>
    );
};

export default DashboardJobs;