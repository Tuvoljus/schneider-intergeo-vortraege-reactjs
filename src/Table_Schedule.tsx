import { useEffect, useState } from "react";
import { ScheduleItem } from "./utils/utils";
import jsonData from './data/schedule_2.json';
import { Accordion, Badge, Container, Stack, Table } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

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

    useEffect(() => {
        setCsvData(jsonData);
    }, []);

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

    // Unique times extracted from the data
    const uniqueTimes = Array.from(new Set(csvData.map(item => item.Date.split(" ")[1])));

    const uniqueCompanies = Array.from(new Set(csvData.map(item => item.Company)).values()).filter((company): company is string => company !== null);

    return (
        <Container>
            <h4>Filter Options</h4>
            <Stack direction="horizontal" gap={3}>
                {/* Placeholder for other filters */}
            </Stack>

            <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={1}
                slidesPerView={3}
                grabCursor={true}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <Stack gap={2}>
                        {["24.09.2024", "25.09.2024", "26.09.2024"].map((day) => (
                            <Badge
                                key={day}
                                pill
                                style={{ cursor: "pointer", margin: "5px" }}
                                onClick={() => handleDaySelect(day)}
                                bg={selectedDays.includes(day) ? 'primary' : 'secondary'}
                            >
                                {day === "24.09.2024" ? "Dienstag" : day === "25.09.2024" ? "Mittwoch" : "Donnerstag"}
                            </Badge>
                        ))}
                    </Stack>
                </SwiperSlide>

                <SwiperSlide>
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

                <SwiperSlide>
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
                                <Table responsive="md" striped bordered hover>
                                    <thead>
                                        <tr>
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
                                                (selectedTimes.length === 0 || selectedTimes.includes(item.Date))
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

            <style>
                {`
                .fade-container {
                    position: relative;
                    height: 50px;
                    overflow: hidden;
                    margin: 10px 0;
                }

                .company-scroll, .time-scroll {
                    height: 100%;
                    overflow-y: auto;
                    padding: 10px 0;
                }

                .company-item, .time-item {
                    display: flex;
                    align-items: center;
                    padding: 5px 10px;
                    cursor: pointer;
                    background-color: #f8f9fa;
                    color: #000;
                    border-radius: 5px;
                    margin-bottom: 5px;
                    transition: background-color 0.3s, color 0.3s;
                }

                .company-item.selected, .time-item.selected {
                    background-color: #007bff;
                    color: #fff;
                }

                .fade-container::before,
                .fade-container::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 20px;
                    pointer-events: none;
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
                    z-index: 1;
                }

                .fade-container::after {
                    top: auto;
                    bottom: 0;
                    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
                }
                `}
            </style>
        </Container>
    );
};
