import {
    Controller,
    ControllerProps,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import { TextInput, TextInputProps } from "../../TextInput/TextInput";

export function FormTextInput<FormType extends FieldValues>({
    control,
    name,
    rules,
    ...textInputProps
}: UseControllerProps<FormType> & TextInputProps) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                    {...textInputProps}
                />
            )}
        />
    );
}
