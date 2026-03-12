import {Form, useNavigate} from "react-router";
import {Button, Card, CardContent, Input} from "../components/ui";
import {ChangeEvent, useState} from "react";

export function NewClass() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create temporary browser URL for the preview
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleBack = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(-1));
    } else {
      navigate(-1);
    }
  };

  return (
      <div className="max-w-xl mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <Form method="post" encType="multipart/form-data" className="space-y-4">
              <Input name="title" placeholder="Class Title" required/>
              <Input name="description" placeholder="Description" required/>

              <div className="grid grid-cols-2 gap-4">
                <Input name="date" type="date" required />
                <Input name="time" type="time" required />
              </div>

              <Input name="maxAttendees" type="number" placeholder="Max Attendees" required/>

              <div className="space-y-2">
                <label className="text-xs font-semibold">Class Photo</label>
                <Input name="image" type="file" accept="image/*" onChange={handleImageChange}/>
                {preview && (
                    <div className="h-32 w-full overflow-hidden rounded-md border">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover"/>
                    </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleBack}
                        className="w-full transition-transform duration-100 active:scale-95">Cancel</Button>
                <Button type="submit"
                        className="w-full transition-transform duration-100 active:scale-95">Create Class</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}