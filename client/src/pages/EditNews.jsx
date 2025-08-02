import { useParams } from "react-router-dom";

function EditNews() {
  const { id } = useParams();
  return (
    <div className="text-center mt-10 text-2xl text-blue-600">
      📝 Edit News — ID: {id}
    </div>
  );
}
export default EditNews;
