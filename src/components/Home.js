import Navbar from './Navbar';
import Card from './Card';
import Section from './Section';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import Cookies from 'js-cookie'; // Import js-cookie

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [grouping, setGrouping] = useState(Cookies.get('grouping') || "priority");
    const [ordering, setOrdering] = useState(Cookies.get('ordering') || "status");
    const [groupedData, setGroupedData] = useState({});
    const [users, setUsers] = useState([]);
    const priorityLabels = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority'
    };

    const handleGroupingChange = (selectedGroup) => {
        setGrouping(selectedGroup);
        Cookies.set('grouping', selectedGroup); // Set cookie for grouping
    };

    // Function to handle Ordering changes
    const handleOrderingChange = (selectedOrder) => {
        setOrdering(selectedOrder);
        Cookies.set('ordering', selectedOrder); // Set cookie for ordering
    };

    // Function to group and order data
    const groupAndOrderData = () => {
        const grouped = {};
        const userMap = {};
        for (let i = 0; i < users.length; i++) {
            userMap[users[i].id] = users[i].name;
        }
        // Group the data manually
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            item["userName"] = userMap[item["userId"]];
            // If grouping by priority, use the label instead of the number
            let groupKey;
           
            groupKey = item[grouping]; // Use the grouping key (e.g., "status")
            

            // If the group doesn't exist, initialize it as an empty array
            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }

            // Add the item to the correct group
            grouped[groupKey].push(item);
        }

        // Sort the data within each group by the ordering key (e.g., "priority")
        for (let groupKey in grouped) {
            grouped[groupKey].sort((a, b) => a[ordering] - b[ordering]);
        }

        // Update the state with the grouped and ordered data
        setGroupedData(grouped);
    };

    useEffect(() => {
        // Fetching data from the API
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.tickets); // Update the state with the fetched data
                setUsers(data.users);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    // Run groupAndOrderData whenever `data`, `grouping`, or `ordering` changes
    useEffect(() => {
        if (data.length > 0) {
            groupAndOrderData();
        }
    }, [data, grouping, ordering]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <section style={{ height: "10vh" }}>
                <div className='container-fluid d-flex align-items-center h-100' style={{ padding: "20px" }}>
                    <div className='h-100 d-flex align-items-center'>
                        <DropdownButton variant={"light"} style={{ color: "black" }}
                            as={ButtonGroup}
                            id="dropdown-grouping-button"
                            title={`Grouping: ${grouping}`}
                        >
                            <Dropdown.Header>Grouping</Dropdown.Header>
                            <Dropdown.Item onClick={() => handleGroupingChange('userName')}>Group by User</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleGroupingChange('status')}>Group by Status</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleGroupingChange('priority')}>Group by Priority</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton variant={"light"} style={{ color: "black" }}
                            className='ms-3'
                            as={ButtonGroup}
                            id="dropdown-ordering-button"
                            title={`Ordering: ${ordering}`}
                        >
                            <Dropdown.Header>Ordering</Dropdown.Header>
                            <Dropdown.Item onClick={() => handleOrderingChange('status')}>Order by Status</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleOrderingChange('priority')}>Order by Priority</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </section>
            <section style={{ backgroundColor: "#f4f6fa", height: "90vh", overflowX: "auto", whiteSpace: "nowrap" }}>
                <div style={{ display: "inline-flex", flexWrap: "nowrap" }}>
                    {Object.keys(groupedData).map((group, index) => (
                        <div key={index} style={{ width: "20vw" }}>
                            <Section group={group} grouping={grouping} cards={groupedData[group]} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
