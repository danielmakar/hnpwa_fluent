import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Nav, Text, Panel, PanelType, List } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const _handleOpen = () => {
    setOpen(!open);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 787px)" });

  var _onRenderGroupHeader = (group) => {
    return (
      <div className="nav-desktop">
        <Text
          variant="xLarge"
          styles={{ root: { paddingTop: "20px", paddingBottom: "20px" } }}
        >
          {group.name}
        </Text>
      </div>
    );
  };

  const _navLinks = [
    {
      name: "Hacker News",
      isExpanded: true,
      links: [
        {
          name: "New",
          key: "New",
          url: "/new",
        },
        {
          name: "Top",
          key: "Top",
          url: "/top",
        },
        {
          name: "Show",
          key: "Show",
          url: "/show",
        },
        {
          name: "Ask",
          key: "Ask",
          url: "/ask",
        },
        {
          name: "Jobs",
          key: "Jobs",
          url: "/jobs",
        },
      ],
    },
  ];

  return (
    <>
      {!isMobile && (
        <Nav
          onRenderGroupHeader={_onRenderGroupHeader}
          groups={_navLinks}
          styles={{
            root: {
              width: "250px",
              height: "100vh",
              borderRight: "1px solid grey",
            },
          }}
        ></Nav>
      )}
      {isMobile && (
        <div>
          <header className="nav-header">
            <Icon
              iconName="CollapseMenu"
              styles={{ root: { marginRight: "15px" } }}
              onClick={_handleOpen}
            />
            <Text variant="xLarge">Hacker News</Text>
          </header>
          <Panel
            isHiddenOnDismiss={true}
            isLightDismiss={true}
            isOpen={open}
            onDismiss={_handleOpen}
            type={PanelType.custom}
            customWidth="100%"
          >
            <Nav
              onRenderGroupHeader={_onRenderGroupHeader}
              groups={_navLinks}
              styles={{
                root: {
                  width: "250px",
                  height: "100vh",
                },
              }}
            ></Nav>
            {/* <List items={navLinks} onRenderCell={}></List> */}
          </Panel>
        </div>
      )}
    </>
  );
};
