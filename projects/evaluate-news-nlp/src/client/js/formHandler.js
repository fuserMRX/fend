import { ajaxHelper } from './helpers/api';
import { meaningCloudAPI, keyURL } from './helpers/constants';

const handleSubmit = async (event) => {
    event.preventDefault();

    // check what text was put into the form field
    const formText = document.getElementById('npltext').value;
    // eslint-disable-next-line no-undef
    Client.checkForName(formText);

    console.log('::: Form Submitted :::');
    // Get API key
    const apiKeyInfo = await ajaxHelper(keyURL);
    const { application_key } = apiKeyInfo || {};
    console.log(application_key);

    // MAKE API request if our key is present
    if(application_key) {
        const formdata = new FormData();
        formdata.append('key', application_key);
        formdata.append('txt', formText);
        formdata.append('lang', 'en');

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        const meaningCloudInfo = await ajaxHelper(meaningCloudAPI, requestOptions);
        console.log(meaningCloudInfo);
    }
};

export { handleSubmit };
