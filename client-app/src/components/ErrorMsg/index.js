import React from 'react'
import './styles/main.css'


function ErrorMsg() {

    return (

        <div className="text-center">
            <h3 className="display-4 fail">
                <span role="img">❌</span>
                    Something doesn't run
                <span role="img">❗</span>
            </h3>
        </div>

    )

}

export default ErrorMsg