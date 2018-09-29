import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <header className="noteapp-header">
                {
                    <h1 className="noteapp-title">Note Application</h1>
                }
            </header>

        );
    }
}

export default Header;