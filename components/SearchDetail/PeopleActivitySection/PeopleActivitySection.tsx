import { getSelectedUserFollowing } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PeopleRow from "./PeopleRow";

const PeopleActivitySection = () => {
  const { userId } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getSelectedUserFollowing(userId).then((res) => {
      dispatch(profileActions.initilizeFollowingList(res));
    });
  }, []);

  return (
    <View className="gap-2 justify-center">
      <PeopleRow
        title="Want to Watch"
        icon={<FontAwesome name="bookmark-o" size={28} color="#a855f7" />}
      />

      <PeopleRow
        title="Watched"
        icon={<FontAwesome name="bookmark" size={28} color="#22c55e" />}
      />

      <PeopleRow
        title="Couldn’t Finish"
        icon={<Ionicons name="pause-outline" size={28} color="#f97316" />}
      />
    </View>
  );
};

export default PeopleActivitySection;
