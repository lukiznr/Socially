import { ButtonGroup, Button } from "~/components/basic/Button";
import Dialog from "~/components/basic/Dialog";
import FAB from "~/components/basic/FAB";
import Card from "~/components/basic/Card";
import Loader from "~/components/basic/Loader";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
export default function Test() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Card>
        <ButtonGroup justify="center" className="p-3" column={true}>
          <Button variant="primary" classNames="flex-1">
            Primary
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </ButtonGroup>
        <Button onClick={() => setShow(!show)}>Show Dialog</Button>
        <Dialog show={show}></Dialog>
      </Card>
      <FAB variant="extended" icon={<PencilIcon />}>
        Edit
      </FAB>
      <Loader />
    </>
  );
}
