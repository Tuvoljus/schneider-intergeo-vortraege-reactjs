import { useEffect, useState } from "react";
import { ScheduleItem } from "./utils/utils";
import jsonData from './data/schedule_2.json';
import { Accordion, Badge, Container, Navbar, Stack, Table } from "react-bootstrap";
import { FaRegHandPointUp } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper/modules';


import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';
// import './customWheel.css';
// import './customSwiper.css';
import './styles.css';

import RhinoTerrain from './data/logos/rhinoterrain-sas-logo.png';
import trimble from './data/logos/trimble.png';
import esri from './data/logos/esri-logo.svg';
import faro from './data/logos/faro-logo.png';
import BitmanagementSoftware from './data/logos/bitmanagement-logo-1-1.png';
import Hexagon from './data/logos/Hexagon_logo_copy.svg';
import ZollerFroehlich from './data/logos/zoller-froehlich-logo.png';

const logoMap: { [key: string]: string } = {
    RhinoTerrain,
    trimble,
    esri,
    faro,
    BitmanagementSoftware,
    Hexagon,
    ZollerFroehlich,
};

export const ScheduleTable = () => {
    const [csvData, setCsvData] = useState<ScheduleItem[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
    const [selectedSoftwareTitles, setSelectedSoftwareTitles] = useState<string[]>([]);
    const [showOverlay, setShowOverlay] = useState(true); // State for the overlay


    useEffect(() => {
        setCsvData(jsonData);

        // Hide the overlay after a few seconds
        const timer = setTimeout(() => {
            setShowOverlay(false);
        }, 5000); // Adjust the time as needed

        return () => clearTimeout(timer);
    }, []);

    // useEffect(() => {
    //     setCsvData(jsonData);
    // }, []);

    const groupedData = csvData.reduce((acc, item) => {
        const [day, time] = item.Date.split(" ");
        const newItem = { ...item, Date: time };

        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(newItem);
        return acc;
    }, {} as { [key: string]: ScheduleItem[] });

    const handleDaySelect = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleCompanySelect = (company: string) => {
        if (selectedCompanies.includes(company)) {
            setSelectedCompanies(selectedCompanies.filter(c => c !== company));
        } else {
            setSelectedCompanies([...selectedCompanies, company]);
        }
    };

    const handleTimeSelect = (time: string) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter(t => t !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    const handleSpeakerSelect = (speaker: string) => {
        if (selectedSpeakers.includes(speaker)) {
            setSelectedSpeakers(selectedSpeakers.filter(s => s !== speaker));
        } else {
            setSelectedSpeakers([...selectedSpeakers, speaker]);
        }
    };

    const handleSoftwareTitleSelect = (title: string) => {
        if (selectedSoftwareTitles.includes(title)) {
            setSelectedSoftwareTitles(selectedSoftwareTitles.filter(t => t !== title));
        } else {
            setSelectedSoftwareTitles([...selectedSoftwareTitles, title]);
        }
    };

    const uniqueTimes = Array.from(new Set(csvData.map(item => item.Date.split(" ")[1])));
    const uniqueCompanies = Array.from(new Set(csvData.map(item => item.Company)).values()).filter((company): company is string => company !== null);
    const uniqueSpeakers = Array.from(new Set(csvData.map(item => item.Speaker)).values()).filter((speaker): speaker is string => speaker !== null);
    const uniqueSoftwareTitles = Array.from(new Set(csvData.map(item => item['Software / Title'])).values()).filter((title): title is string => title !== null);


    return (
        <Container>
            <Navbar expand="lg" style={{ backgroundColor: "#393939" }}>
                <Container>
                    <h2><b style={{ color: "#f0c905" }}>Präsentations-Timetable</b></h2>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
            <Stack direction="horizontal" style={{ backgroundColor: "#f0c905", paddingLeft: "1rem", marginTop: ".8rem", marginBottom: ".8rem", paddingTop: ".5rem" }}>
                <div >
                    <h5>Partner-Präsentationen auf unserem Stand
                    </h5>
                </div>
            </Stack>
            <Stack direction="horizontal">
                <span style={{ fontSize: ".9em", }}>Filter Optionen:</span>
            </Stack>


            <Swiper
                modules={[Pagination, Navigation, A11y]}
                // navigation={true}
                spaceBetween={1}
                slidesPerView={3}
                grabCursor={true}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                style={{ paddingBottom:"1rem" }}
            >
                {showOverlay && (
                    <div className="icon-overlay" style={{ marginTop: "30px" }}>
                        <div className="icon">
                            {/* Replace this with your desired icon */}
                            {/* <span role="img" aria-label="icon">✨</span> */}
                            <span role="img" aria-label="icon">
                                <FaRegHandPointUp />
                            </span>
                        </div>
                    </div>
                )}
                <SwiperSlide draggable style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <span className="filter-titel">Software / Title</span>
                    <div className="fade-container">
                        <div className="software-title-scroll">
                            {uniqueSoftwareTitles.map((title) => (
                                <div
                                    key={title}
                                    className={`software-title-item ${selectedSoftwareTitles.includes(title) ? 'selected' : ''}`}
                                    onClick={() => handleSoftwareTitleSelect(title)}
                                >
                                    {title}
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <span className="filter-titel">Company</span>
                    <div className="fade-container">
                        <div className="company-scroll">
                            {uniqueCompanies.map((company) => (
                                <div
                                    key={company}
                                    className={`company-item ${selectedCompanies.includes(company) ? 'selected' : ''}`}
                                    onClick={() => handleCompanySelect(company)}
                                >
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <span className="filter-titel">Time</span>

                    <div className="fade-container">
                        <div className="time-scroll">
                            {uniqueTimes.map((time) => (
                                <div
                                    key={time}
                                    className={`time-item ${selectedTimes.includes(time) ? 'selected' : ''}`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <span className="filter-titel">Speaker</span>
                    <div className="fade-container">
                        <div className="speaker-scroll">
                            {uniqueSpeakers.map((speaker) => (
                                <div
                                    key={speaker}
                                    className={`speaker-item ${selectedSpeakers.includes(speaker) ? 'selected' : ''}`}
                                    onClick={() => handleSpeakerSelect(speaker)}
                                >
                                    {speaker}
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                    {/* <Stack  style={{ marginBottom: "20px" }}> */}
                    <span className="filter-titel">Day</span>

                    <div className="fade-container">
                        <div className="company-scroll">
                            {["24.09.2024", "25.09.2024", "26.09.2024"].map((day) => (
                                <div
                                    key={day}
                                    className={`company-item ${selectedDays.includes(day) ? 'selected' : ''}`}
                                    onClick={() => handleDaySelect(day)}
                                    
                                >
                                    {/* <Badge
                                        onClick={() => handleDaySelect(day)}
                                        style={{ cursor: "pointer" }}
                                        bg={selectedDays.includes(day) ? 'primary' : 'secondary'}
                                    >{day === "24.09.2024" ? "Dienstag" : day === "25.09.2024" ? "Mittwoch" : "Donnerstag"}</Badge> */}
                                    {day === "24.09.2024" ? "Dienstag" : day === "25.09.2024" ? "Mittwoch" : "Donnerstag"}
                                </div>
                                // <Badge
                                //     key={day}
                                //     pill
                                //     style={{ cursor: "pointer", margin: "3px" }}
                                //     onClick={() => handleDaySelect(day)}
                                //     bg={selectedDays.includes(day) ? 'primary' : 'secondary'}
                                // >
                                //     {day === "24.09.2024" ? "Dienstag" : day === "25.09.2024" ? "Mittwoch" : "Donnerstag"}
                                // </Badge>


                            ))}
                        </div>
                    </div>
                    {/* </Stack> */}
                </SwiperSlide>

            </Swiper>

            <Accordion defaultActiveKey="0" alwaysOpen>
                {Object.entries(groupedData)
                    .filter(([day]) => selectedDays.length === 0 || selectedDays.includes(day))
                    .map(([day, items], index) => (
                        <Accordion.Item eventKey={index.toString()} key={day}>
                            <Accordion.Header>
                                {day === "24.09.2024" ? `Dienstag, ${day}` : day === "25.09.2024" ? `Mittwoch, ${day}` : `Donnerstag, ${day}`}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table responsive="md" striped hover>
                                    <thead>
                                        <tr style={{ borderBlockColor: "#f0c905", borderBlockEndWidth: ".2rem" }}>
                                            <th>Time</th>
                                            <th>Company</th>
                                            <th>Software / Title</th>
                                            <th>Speaker</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {items
                                            .filter(item =>
                                                (selectedCompanies.length === 0 || (item.Company && selectedCompanies.includes(item.Company))) &&
                                                (selectedTimes.length === 0 || selectedTimes.includes(item.Date)) &&
                                                (selectedSpeakers.length === 0 || (item.Speaker && selectedSpeakers.includes(item.Speaker))) &&
                                                (selectedSoftwareTitles.length === 0 || (item['Software / Title'] && selectedSoftwareTitles.includes(item['Software / Title'])))

                                            )
                                            .map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.Date}</td>
                                                    <td>
                                                        <Stack direction="horizontal" gap={2}>
                                                            <img
                                                                src={logoMap[item.LogoImportName] || ''}
                                                                alt={`${item.Company} logo`}
                                                                width={80}
                                                            />
                                                            {item.Company}
                                                        </Stack>
                                                    </td>
                                                    <td>{item['Software / Title']}</td>
                                                    <td>{item.Speaker}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
            </Accordion>

        
        </Container>
    );
};
