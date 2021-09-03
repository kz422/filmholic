// import "./styles.css";
import SimpleReactFooter from "simple-react-footer";
import { Wrapper } from "./Footer.styles";

const Footer = () => {
  const description = "For all movie freaks";
  const title = "Movie Freak";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Careers",
                link: "/careers"
            },
            {
                name: "Contact",
                link: "/contact"
            },
            {
                name: "Admin",
                link: "/admin"
            }
        ]
    },
    // {
    //     title: "Legal",
    //     resources: [
    //         {
    //             name: "Privacy",
    //             link: "/privacy"
    //         },
    //         {
    //             name: "Terms",
    //             link: "/terms"
    //         }
    //     ]
    // },
    // {
    //     title: "Visit",
    //     resources: [
    //         {
    //             name: "Locations",
    //             link: "/locations"
    //         },
    //         {
    //             name: "Culture",
    //             link: "/culture"
    //         }
    //     ]
    // }
  ];
  return (
    <Wrapper>
      <SimpleReactFooter 
        description={description} 
        title={title}
        columns={columns}
        copyright="pino"
        iconColor="black"
        backgroundColor="gray"
        fontColor="black"
        copyrightColor="darkgrey"
    />
    </Wrapper>
  );
}

export default Footer
