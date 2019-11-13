import React from 'react';
import SHA from "sha.js";

const TestHash: React.FC = () => {

    const testhash = ( authToken: string, tokenHash: string ) =>
    {
        let verifyToken = SHA('sha256').update( authToken ).digest( 'hex' );
        if( verifyToken === tokenHash )
            return "yes";

            return "no";
    }

    return <span>{"Hash token tested correctly: " + testhash( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "7f75367e7881255134e1375e723d1dea8ad5f6a4fdb79d938df1f1754a830606" )}</span>
}

export default TestHash;