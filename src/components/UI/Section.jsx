import React from "react";

import styles from "./Section.module.scss";

const Section = (props) => {
    return <section className={styles.section}>{props.children}</section>;
};

export default Section;
