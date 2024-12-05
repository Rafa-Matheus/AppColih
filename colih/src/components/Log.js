import styles from "../styles/DashboardScreen.module.css"

export default (props) => {
    return <textarea className={styles.log} >{
        "00:00:00 00/00/0000: Initializing...\n" +
        "00:00:00 00/00/0000: Connecting with database...\n" +
        "00:00:00 00/00/0000: AGV requested\n" +
        "00:00:00 00/00/0000: Going to the 2th floor...\n" +
        "00:00:00 00/00/0000: Opening gates...\n" +
        "00:00:00 00/00/0000: AGV is entering...\n" +
        "00:00:00 00/00/0000: Goint to the 1th floor...\n" +
        "00:00:00 00/00/0000: Opening gates...\n"
    }
    </textarea>
}