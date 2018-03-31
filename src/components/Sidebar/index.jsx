import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ()=>({
    render() {
        return (
            <div>
                <ul>
                    <li>Привычки</li>
                    <li>Сегодня</li>
                </ul>
            </div>
        );
    }
});

export default Sidebar;
