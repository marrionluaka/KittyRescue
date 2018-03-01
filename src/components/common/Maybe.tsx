const Maybe = ({ render, renderAlt, pred }) => pred() ? render() : renderAlt();

export { Maybe };