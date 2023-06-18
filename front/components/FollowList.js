import { StopOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MouseEventHandler, useMemo } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowList = ({ data, header, onClickMore, loading }) => {
  const { Item } = List;
  const { Meta } = Card;

  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);
  const itemStyle = useMemo(() => ({ marginTop: 20 }), []);
  
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };
  return (
    <List
      grid={{ gutter: 4, xs: 2, md: 3 }}
      style={listStyle}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <LoadmoreButton>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </LoadmoreButton>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <Item style={itemStyle}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Meta description={item.nickname} />
          </Card>
        </Item>
      )}
    ></List>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const LoadmoreButton = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export default FollowList;
