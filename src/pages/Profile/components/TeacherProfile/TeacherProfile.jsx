import ProfileCalendar from "pages/Profile/components/TeacherProfile/ProfileCalendar/ProfileCalendar";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormationList from "./FormationList";

const TeacherProfile = (props) => {
  const { data, get } = useFetch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    get(`/courses?teacher_id=${currentUser.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data && (
        <>
          <FormationList courses={data} />
          <ProfileCalendar courses={data} />
        </>
      )}
    </>
  );
};

export default TeacherProfile;
