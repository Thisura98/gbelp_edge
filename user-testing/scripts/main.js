function register(){
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf9_53lgtHJRHHeK3iXApXFl1w7tmMdQvTkBCkKornjpn6Cyg/viewform?usp=sf_link';

    window.open(formUrl, '_blank');
}

function goTohowToJoin(){
    let newLocation = window.location.href.split('#')[0];
    newLocation += '#section-howtojoin';
    window.location = newLocation;
}