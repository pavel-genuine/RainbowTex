import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useEffect } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Stories = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className='pt-20 bg-navBg'>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#5b6d1a', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #5b6d1a' }}
                    date="2006 - 2010"
                    iconStyle={{ background: '#5b6d1a', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-1</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>

                    <img className='rounded-lg mt-2' src="https://i.ibb.co/S6yvBy7/Screenshot-2023-04-15-001158.png" alt="" />
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2011 - 2014"
                    iconStyle={{ background: '#5b6d1a', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-2</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2014 - 2016"
                    iconStyle={{ background: '#5b6d1a', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-3</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2016 - 2018"
                    iconStyle={{ background: 'red', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-4</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2019- 2020"
                    iconStyle={{ background: 'red', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-5</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2020- 2021"
                    iconStyle={{ background: 'red', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-5</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2021 - present"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Initiative-6</h3>
                    <h4 className="vertical-timeline-element-subtitle">Uttara, Dhaka</h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<AccountBalanceIcon />}
                />
            </VerticalTimeline>
        </div>
    )
}

export default Stories